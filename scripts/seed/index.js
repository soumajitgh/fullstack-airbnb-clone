const fs = require('node:fs/promises');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { createRequire } = require('node:module');

const serverRoot = path.resolve(__dirname, '../../apps/server');
const serverRequire = createRequire(path.join(serverRoot, 'index.js'));

serverRequire('ts-node/register/transpile-only');

const bcrypt = serverRequire('bcryptjs');
const { ConfigService } = serverRequire('@nestjs/config');

const dataSource = serverRequire('./src/database/typeorm.datasource.ts').default;
const { User } = serverRequire('./src/modules/auth/user.entity.ts');
const { Listing } = serverRequire('./src/modules/listing/entities/listing.entity.ts');
const {
  ListingImage,
} = serverRequire('./src/modules/listing/entities/listing-image.entity.ts');
const {
  ListingLocation,
} = serverRequire('./src/modules/listing/entities/listing-location.entity.ts');
const {
  UploadService,
} = serverRequire('./src/shared/upload/upload.service.ts');

const seedRoot = path.resolve(__dirname);
const seedDataPath = path.join(seedRoot, 'data.json');
const seedImagesPath = path.join(seedRoot, 'images');

function buildSeedImageKey(fileName) {
  return `seed/listings/${fileName}`;
}

async function readSeedData() {
  const rawSeedData = await fs.readFile(seedDataPath, 'utf8');
  return JSON.parse(rawSeedData);
}

function createUploadService() {
  return new UploadService(new ConfigService(process.env));
}

async function seedUsers(users) {
  const userRepository = dataSource.getRepository(User);
  const usersByEmail = new Map();

  for (const seedUser of users) {
    let user = await userRepository.findOne({
      where: { email: seedUser.email },
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash(seedUser.password, 10);
      user = userRepository.create({
        email: seedUser.email,
        password: hashedPassword,
      });
      user = await userRepository.save(user);
    }

    usersByEmail.set(seedUser.email, user);
  }

  return usersByEmail;
}

async function seedProperties(properties, usersByEmail) {
  const listingRepository = dataSource.getRepository(Listing);
  const listingLocationRepository = dataSource.getRepository(ListingLocation);
  const listingImageRepository = dataSource.getRepository(ListingImage);
  const uploadService = createUploadService();

  for (const seedProperty of properties) {
    const host = usersByEmail.get(seedProperty.hostEmail);

    if (!host) {
      throw new Error(
        `Missing host for ${seedProperty.title}: ${seedProperty.hostEmail}`,
      );
    }

    let listing = await listingRepository.findOne({
      where: {
        title: seedProperty.title,
        host: { id: host.id },
      },
      relations: {
        host: true,
        location: true,
        images: true,
      },
    });

    if (!listing) {
      const location = await listingLocationRepository.save(
        listingLocationRepository.create({
          lat: seedProperty.location.lat,
          lng: seedProperty.location.lng,
        }),
      );

      listing = await listingRepository.save(
        listingRepository.create({
          title: seedProperty.title,
          description: seedProperty.description,
          costing: seedProperty.costing,
          host,
          location,
        }),
      );
    }

    for (const image of seedProperty.images) {
      const bucketLocation = buildSeedImageKey(image.fileName);
      const existingImage = await listingImageRepository.findOne({
        where: {
          listing: { id: listing.id },
          bucketLocation,
        },
        relations: {
          listing: true,
        },
      });

      if (existingImage) {
        continue;
      }

      const imagePath = path.join(seedImagesPath, image.fileName);
      const imageBuffer = await fs.readFile(imagePath);
      const uploadedImage = await uploadService.uploadBuffer(
        bucketLocation,
        imageBuffer,
        'image/jpeg',
      );

      await listingImageRepository.save(
        listingImageRepository.create({
          id: randomUUID(),
          bucketLocation: uploadedImage.bucketLocation,
          publicUrl: uploadedImage.publicUrl,
          label: image.label,
          category: image.category,
          listing,
        }),
      );
    }
  }
}

async function main() {
  const seedData = await readSeedData();

  if (!Array.isArray(seedData.users) || seedData.users.length === 0) {
    throw new Error('seed/data.json must contain at least one user.');
  }

  if (!Array.isArray(seedData.properties) || seedData.properties.length === 0) {
    throw new Error('seed/data.json must contain at least one property.');
  }

  await dataSource.initialize();

  try {
    const usersByEmail = await seedUsers(seedData.users);
    await seedProperties(seedData.properties, usersByEmail);
    console.log('Seed completed successfully.');
  } finally {
    await dataSource.destroy();
  }
}

main().catch((error) => {
  console.error('Seed failed.', error);
  process.exitCode = 1;
});

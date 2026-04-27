import path from 'node:path';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

import { User } from '../modules/auth/user.entity';
import { Booking } from '../modules/booking/booking.entity';
import { Listing } from '../modules/listing/entities/listing.entity';
import { ListingImage } from '../modules/listing/entities/listing-image.entity';
import { ListingLocation } from '../modules/listing/entities/listing-location.entity';

type TypeOrmEnv = {
  DB_HOST: string;
  DB_PORT: number | string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
};

export const appEntities = [
  User,
  Booking,
  Listing,
  ListingImage,
  ListingLocation,
];

export function createTypeOrmOptions(
  env: TypeOrmEnv,
): TypeOrmModuleOptions & DataSourceOptions {
  return {
    type: 'postgres',
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    entities: appEntities,
    migrations: [path.join(__dirname, 'migrations/*{.ts,.js}')],
    migrationsTableName: 'migrations_history',
    migrationsRun: true,
    synchronize: false,
  };
}

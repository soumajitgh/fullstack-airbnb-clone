import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as uuid from 'uuid';
import { User } from '../../auth/user.entity';
import { ListingImage } from '../entities/listing-image.entity';
import { Repository } from 'typeorm';
import { AddListingImageDto } from '../dto/CRUD/add-listing-image.dto';
import { ListingUploadService } from '../../../shared/upload/listing-upload.service';
import { ListingRepository } from '../listing.repository';

@Injectable()
export class ListingImageService {
  logger = new Logger(ListingImageService.name);

  constructor(
    private readonly listingUploadService: ListingUploadService,
    @InjectRepository(ListingImage)
    private listingImageRepository: Repository<ListingImage>,
    private readonly listingRepository: ListingRepository,
  ) {}

  /**
   * Adds an image to a listing.
   * @param listingId - The ID of the listing to add the image to.
   * @param addListingImageDto - The image details.
   * @param image - The image file to upload.
   * @param user - The user adding the image.
   * @returns The added listing image.
   */
  async addListingImage(
    listingId: string,
    addListingImageDto: AddListingImageDto,
    image: Express.Multer.File,
    user: User,
  ): Promise<ListingImage> {
    const { label, category } = addListingImageDto;

    // Find the listing by ID
    const listing = await this.listingRepository.findOneByOrFail({
      id: listingId,
      host: user,
    });

    const listingImageId = uuid.v4();
    // Uploading image to bucket
    const { bucketLocation, publicUrl } =
      await this.listingUploadService.uploadListingImage(listingImageId, image);

    // Saving reference in database
    const listingImageReference = this.listingImageRepository.create({
      id: listingImageId,
      bucketLocation,
      publicUrl,
      label,
      category,
      listing,
    });
    return await this.listingImageRepository.save(listingImageReference);
  }

  /**
   * Deletes an image from a listing.
   * @param listingId - The ID of the listing to delete the image from.
   * @param listingImageId - The ID of the image to delete.
   * @param user - The user attempting to delete the image.
   * @throws NotFoundException if the listing or image is not found.
   */
  async deleteListingImage(
    listingId: string,
    listingImageId: string,
    user: User,
  ): Promise<void> {
    // Find the listing by ID
    const listing = await this.listingRepository.findOneByOrFail({
      id: listingId,
      host: user,
    });

    for (const image of listing.images) {
      if (image.id == listingImageId) {
        // Deleting image from storage
        await this.listingUploadService.deleteListingImage(image);
        // Deleting File Reference
        await this.listingImageRepository.remove(image);
      }
    }
  }
}

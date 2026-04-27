import { UploadService } from './upload.service';
import { Injectable, Logger } from '@nestjs/common';
import { ListingImage } from '../../modules/listing/entities/listing-image.entity';

@Injectable()
export class ListingUploadService {
  static BASE_PATH = 'images/listing/';

  logger = new Logger(ListingUploadService.name);

  constructor(private readonly uploadService: UploadService) {}

  /**
   * Formats the file name for the listing image.
   * @param {string} listingId - The ID of the listing.
   * @param {string} originalFileName - The original file name.
   * @returns {string} The formatted file name.
   */
  formatFileName(listingId: string, originalFileName: string): string {
    const nl = originalFileName.split('.');

    return listingId + '.' + nl.pop();
  }

  /**
   * Uploads a listing image to the storage bucket.
   * @param {string} listingImageId - The ID of the listing image.
   * @param {Express.Multer.File} image - The image file to upload.
   * @returns {Promise<{bucketLocation: string; publicUrl: string}>} The bucket location and public URL of the uploaded image.
   */
  async uploadListingImage(
    listingImageId: string,
    image: Express.Multer.File,
  ): Promise<{ bucketLocation: string; publicUrl: string }> {
    const bucketLocation =
      ListingUploadService.BASE_PATH +
      this.formatFileName(listingImageId, image.originalname);

    const uploadedImage = await this.uploadService.uploadBuffer(
      bucketLocation,
      image.buffer,
      image.mimetype,
    );

    this.logger.verbose(`Upload finished for listing image ${listingImageId}`);

    return uploadedImage;
  }

  /**
   * Deletes a listing image from the storage bucket.
   * @param {ListingImage} listingImage - The listing image to delete.
   * @returns {Promise<void>} A promise that resolves when the image is deleted.
   */
  async deleteListingImage(listingImage: ListingImage): Promise<void> {
    await this.uploadService.deleteObject(listingImage.bucketLocation);

    this.logger.verbose(`Deleted listing image with id: ${listingImage.id}`);
  }
}

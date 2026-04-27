import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ListingService } from './services/listing.service';
import { CreateListingDto } from './dto/CRUD/create-listing.dto';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { Listing } from './entities/listing.entity';
import { UpdateListingDto } from './dto/CRUD/update-listing.dto';
import { ListingImageService } from './services/listing-image.service';
import { AddListingImageDto } from './dto/CRUD/add-listing-image.dto';
import { ListingImage } from './entities/listing-image.entity';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { SearchAreaDto } from './dto/search-area.dto';

@Controller('listing')
@UseGuards(JwtGuard)
export class ListingController {
  constructor(
    private readonly listingService: ListingService,
    private readonly listingImageService: ListingImageService,
  ) {}

  /**
   * Retrieves all listings for a given user.
   * @param {User} user - The user whose listings are to be retrieved.
   * @returns {Promise<Listing[]>} A promise that resolves to an array of listings.
   */
  @Get('/')
  getListings(@GetUser() user: User): Promise<Listing[]> {
    return this.listingService.getListings(user);
  }

  /**
   * Retrieves listings based on search criteria.
   * @param {SearchAreaDto} searchAreaDto - The search criteria.
   * @returns {Promise<Listing[]>} A promise that resolves to an array of listings.
   */
  @Get('/search')
  getListingBySearch(
    @Query() searchAreaDto: SearchAreaDto,
  ): Promise<Listing[]> {
    return this.listingService.getListingBySearch(searchAreaDto);
  }

  /**
   * Retrieves a listing by its ID.
   * @param {string} listingId - The ID of the listing to retrieve.
   * @returns {Promise<Listing>} A promise that resolves to the listing.
   */
  @Get('/:id')
  getListingById(@Param('id') listingId: string): Promise<Listing> {
    return this.listingService.getListingById(listingId);
  }

  /**
   * Creates a new listing.
   * @param {CreateListingDto} createListingDto - The data transfer object containing the listing details.
   * @param {User} user - The user creating the listing.
   * @returns {Promise<Listing>} A promise that resolves to the created listing.
   */
  @Post('/new')
  createListing(
    @Body()
    createListingDto: CreateListingDto,
    @GetUser() user: User,
  ): Promise<Listing> {
    return this.listingService.createListing(createListingDto, user);
  }

  /**
   * Updates an existing listing.
   * @param {string} listingId - The ID of the listing to update.
   * @param {UpdateListingDto} updateListingDto - The data transfer object containing the updated listing details.
   * @param {User} user - The user updating the listing.
   * @returns {Promise<Listing>} A promise that resolves to the updated listing.
   */
  @Patch('/:listingId')
  updateListing(
    @Param('listingId') listingId: string,
    @Body() updateListingDto: UpdateListingDto,
    @GetUser() user: User,
  ): Promise<Listing> {
    return this.listingService.updateListing(listingId, updateListingDto, user);
  }

  /**
   * Adds a new image to a listing.
   * @param {Express.Multer.File} image - The image file to upload.
   * @param {string} listingId - The ID of the listing to add the image to.
   * @param {AddListingImageDto} addListingImageDto - The data transfer object containing the image details.
   * @param {User} user - The user adding the image.
   * @returns {Promise<ListingImage>} A promise that resolves to the added image.
   */
  @Post('/:listingId/image/new')
  @UseInterceptors(FileInterceptor('image'))
  addImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5000000 }),
          new FileTypeValidator({ fileType: 'image/(jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
    @Param('listingId') listingId: string,
    @Body() addListingImageDto: AddListingImageDto,
    @GetUser() user: User,
  ): Promise<ListingImage> {
    return this.listingImageService.addListingImage(
      listingId,
      addListingImageDto,
      image,
      user,
    );
  }

  /**
   * Deletes a listing.
   * @param {string} listingId - The ID of the listing to delete.
   * @param {User} user - The user deleting the listing.
   * @returns {Promise<void>} A promise that resolves when the listing is deleted.
   */
  @Delete('/:listingId')
  deleteListing(
    @Param('listingId') listingId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.listingService.deleteListing(listingId, user);
  }

  /**
   * Deletes an image from a listing.
   * @param {string} listingId - The ID of the listing.
   * @param {string} listingImageId - The ID of the image to delete.
   * @param {User} user - The user deleting the image.
   * @returns {Promise<void>} A promise that resolves when the image is deleted.
   */
  @Delete('/:listingId/image/:listingImageId')
  deleteImage(
    @Param('listingId') listingId: string,
    @Param('listingImageId') listingImageId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.listingImageService.deleteListingImage(
      listingId,
      listingImageId,
      user,
    );
  }
}

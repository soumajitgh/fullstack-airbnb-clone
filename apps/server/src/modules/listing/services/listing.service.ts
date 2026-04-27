import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateListingDto } from '../dto/CRUD/create-listing.dto';
import { User } from '../../auth/user.entity';
import { ListingRepository } from '../listing.repository';
import { Listing } from '../entities/listing.entity';
import { UpdateListingDto } from '../dto/CRUD/update-listing.dto';
import { ListingImageService } from './listing-image.service';
import { SearchAreaDto } from '../dto/search-area.dto';

@Injectable()
export class ListingService {
  logger = new Logger(ListingService.name);

  constructor(
    @Inject(forwardRef(() => ListingImageService))
    private readonly listingImageService: ListingImageService,
    private readonly listingRepository: ListingRepository,
  ) {}

  /**
   * Retrieves all listings for a given user.
   * @param {User} user - The user whose listings are to be retrieved.
   * @returns {Promise<Listing[]>} A promise that resolves to an array of listings.
   */
  getListings(user: User): Promise<Listing[]> {
    return this.listingRepository.findBy({ host: user });
  }

  /**
   * Retrieves a listing by its ID for a given user.
   * @param {string} listingId - The ID of the listing to retrieve.
   * @returns {Promise<Listing>} A promise that resolves to the listing.
   * @throws {NotFoundException} If the listing is not found.
   */
  async getListingById(listingId: string): Promise<Listing> {
    try {
      return await this.listingRepository.findOneByOrFail({
        id: listingId,
      });
    } catch (err) {
      throw new NotFoundException(`Listing with id:${listingId} not found.`);
    }
  }

  /**
   * Retrieves listings based on search criteria.
   * @param {SearchAreaDto} searchAreaDto - The search criteria.
   * @returns {Promise<Listing[]>} A promise that resolves to an array of listings.
   */
  async getListingBySearch(searchAreaDto: SearchAreaDto): Promise<Listing[]> {
    return await this.listingRepository.findListingByLocation(searchAreaDto);
  }

  /**
   * Creates a new listing.
   * @param {CreateListingDto} createListingDto - The data transfer object containing the listing details.
   * @param {User} user - The user creating the listing.
   * @returns {Promise<Listing>} A promise that resolves to the created listing.
   */
  async createListing(
    createListingDto: CreateListingDto,
    user: User,
  ): Promise<Listing> {
    const listing = await this.listingRepository.createListing(
      createListingDto,
      user,
    );

    this.logger.verbose(`Listing ${listing.id} created by user ${user.id}`);

    return listing;
  }

  /**
   * Updates an existing listing.
   * @param {string} listingId - The ID of the listing to update.
   * @param {UpdateListingDto} updateListingDto - The data transfer object containing the updated listing details.
   * @param {User} user - The user updating the listing.
   * @returns {Promise<Listing>} A promise that resolves to the updated listing.
   * @throws {NotFoundException} If the listing is not found.
   */
  async updateListing(
    listingId: string,
    updateListingDto: UpdateListingDto,
    user: User,
  ): Promise<Listing> {
    const listing = await this.listingRepository.findOne({
      where: {
        id: listingId,
        host: user,
      },
    });

    if (!listing) {
      throw new NotFoundException(`Listing with id:${listingId} not found.`);
    }

    return this.listingRepository.updateListing(listing.id, updateListingDto);
  }

  /**
   * Deletes a listing and its associated images.
   * @param {string} listingId - The ID of the listing to delete.
   * @param {User} user - The user deleting the listing.
   * @returns {Promise<void>} A promise that resolves when the listing is deleted.
   * @throws {NotFoundException} If the listing is not found.
   */
  async deleteListing(listingId: string, user: User): Promise<void> {
    const listing = await this.listingRepository.findOne({
      where: {
        id: listingId,
        host: user,
      },
      relations: ['images'],
    });

    if (!listing) {
      throw new NotFoundException(`Listing with id:${listingId} not found.`);
    }

    await this.listingRepository.delete({ id: listingId, host: user });

    this.logger.verbose(`Deleted listing with id: ${listingId}`);
  }
}

import { Injectable } from '@nestjs/common';
import { Between, DataSource, Repository } from 'typeorm';
import { Listing } from './entities/listing.entity';
import { CreateListingDto } from './dto/CRUD/create-listing.dto';
import { User } from '../auth/user.entity';
import { UpdateListingDto } from './dto/CRUD/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingLocation } from './entities/listing-location.entity';
import { SearchAreaDto } from './dto/search-area.dto';

@Injectable()
export class ListingRepository extends Repository<Listing> {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(ListingLocation)
    private listingLocationRepository: Repository<ListingLocation>,
  ) {
    super(Listing, dataSource.createEntityManager());
  }

  /**
   * Finds listings based on location criteria.
   * @param {SearchAreaDto} searchAreaDto - The search criteria containing latitude, longitude, and search radius.
   * @returns {Promise<Listing[]>} A promise that resolves to an array of listings.
   */
  async findListingByLocation(
    searchAreaDto: SearchAreaDto,
  ): Promise<Listing[]> {
    const { lat, lng, searchRadius } = searchAreaDto;

    const searchRadiusInLatLgn = searchRadius / 111.32;

    return this.findBy({
      location: {
        lat: Between(lat - searchRadiusInLatLgn, lat + searchRadiusInLatLgn),
        lng: Between(lng - searchRadiusInLatLgn, lng + searchRadiusInLatLgn),
      },
    });
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
    const { title, description, costing, location } = createListingDto;

    const listingLocation = this.listingLocationRepository.create({
      lat: location.lat,
      lng: location.lng,
    });
    const savedListingLocation =
      await this.listingLocationRepository.save(listingLocation);

    const listing = this.create({
      title,
      description,
      costing,
      host: user,
      location: savedListingLocation,
    });
    return this.save(listing);
  }

  /**
   * Updates an existing listing.
   * @param {string} listingId - The ID of the listing to update.
   * @param {UpdateListingDto} updateListingDto - The data transfer object containing the updated listing details.
   * @returns {Promise<Listing>} A promise that resolves to the updated listing.
   */
  async updateListing(
    listingId: string,
    updateListingDto: UpdateListingDto,
  ): Promise<Listing> {
    const { title, description } = updateListingDto;

    const listing = await this.findOne({ where: { id: listingId } });

    if (title) {
      listing.title = title;
    }
    if (description) {
      listing.description = description;
    }

    return await this.save(listing);
  }
}

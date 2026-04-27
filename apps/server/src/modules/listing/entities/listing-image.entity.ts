import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from './listing.entity';
import { Exclude } from 'class-transformer';

export enum ListingImageCategory {
  EXTERIOR = 'exterior',
  BEDROOM = 'bedroom',
  BATHROOM = 'bathroom',
  COMMON_AREA = 'common_area',
}

@Entity()
export class ListingImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  bucketLocation: string;

  @Column()
  publicUrl: string;

  @Column({ nullable: true })
  label: string;

  @Column({ enum: ListingImageCategory })
  category: ListingImageCategory;

  @ManyToOne(() => Listing, (listing) => listing.images, {
    onDelete: 'CASCADE',
  })
  listing: Listing;
}

import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ListingImageCategory } from '../../entities/listing-image.entity';

export class AddListingImageDto {
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(50)
  label?: string;

  @IsString()
  @IsEnum(ListingImageCategory)
  category: ListingImageCategory;
}

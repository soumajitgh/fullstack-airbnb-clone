import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { LocationDto } from '../listing-location.dto';

export class CreateListingDto {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(200)
  @IsOptional()
  description?: string;

  @Transform((params) => parseInt(params.value, 10))
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @Max(1000000)
  costing: number;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}

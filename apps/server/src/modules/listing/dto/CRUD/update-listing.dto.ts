import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateListingDto {
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(50)
  title?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(200)
  @IsOptional()
  description?: string;
}

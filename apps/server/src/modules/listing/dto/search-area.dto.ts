import { IsNumber, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchAreaDto {
  @Transform((params) => parseInt(params.value, 10))
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @Max(50)
  searchRadius: number;

  @Transform((params) => parseFloat(params.value))
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;

  @Transform((params) => parseFloat(params.value))
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng: number;
}

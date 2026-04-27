import { IsNumber } from 'class-validator';

export class LocationDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

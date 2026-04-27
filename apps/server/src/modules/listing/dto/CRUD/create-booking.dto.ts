import { IsDateString, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsDateString()
  checkInDate: string;

  @IsString()
  @IsDateString()
  checkOutDate: string;
}

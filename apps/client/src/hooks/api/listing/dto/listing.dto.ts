import { LatLngLiteral } from '../../../../types/location.type.ts';
import { ImageFile } from '../../../../types/files/image-file.type.ts';

export type SearchListingsDto = LatLngLiteral & { searchRadius: number | 10 }

export type CreateListingDto = {
  metadata: CreateListingMetadataDto
  images: UploadListingImageDto[]
}

export type CreateListingMetadataDto = {
  title: string;
  description: string;
  costing: number
  location: LatLngLiteral,
}

export type UploadListingImageDto = {
  category: string;
  imageFile: ImageFile;
}
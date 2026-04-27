export enum ListingImageCategory {
  EXTERIOR = 'exterior',
  BEDROOM = 'bedroom',
  BATHROOM = 'bathroom',
  COMMON_AREA = 'common_area',
}

export type ListingImage = {
  id: string;

  publicUrl: string;

  label: string;

  category: ListingImageCategory;
}
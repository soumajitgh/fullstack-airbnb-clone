import { CreateListingDto } from './dto/listing.dto.ts';
import useAxiosPrivate from '../../auth/useAxiosPrivate.ts';
import { useMutation } from '@tanstack/react-query';

const URLS = {
  newListings: 'listing/new',
  uploadListingImage: (listingId: string) => `listing/${listingId}/image/new`,
};

export const useMutateCreateListing = (mutateCreateListingProps: { onSuccess?: () => void }) => {
  const { onSuccess } = mutateCreateListingProps;

  const axiosPrivateInstance = useAxiosPrivate();

  const mutateFunction = async (createListingDto: CreateListingDto) => {
    const response = await axiosPrivateInstance.post(URLS.newListings, createListingDto.metadata);
    const listingId: string = response.data.id;

    for (const image of createListingDto.images) {
      const formData = new FormData();
      formData.append('image', image.imageFile);
      formData.append('category', image.category);

      await axiosPrivateInstance.post(URLS.uploadListingImage(listingId), formData);
    }

    return response;
  };

  return useMutation({
    mutationFn: mutateFunction,
    onSuccess,
  });
};

import { ListingImage } from '../../../../types/listing/listing-image.type.ts';
import classNames from 'classnames';
import placeHolderImage from '../../../../assets/images/placeholder.svg';

const ListingBentoGrid = ({ listingImages }: { listingImages: ListingImage[] }) => {

  const FallBackSafeImage = ({ listingImage, className }: {
    listingImage: ListingImage | null;
    className: string;
  }) => {
    if (listingImage) {
      return (
        <img src={listingImage.publicUrl} className={classNames(className, 'w-full h-full animate-fade-in')}
             alt={listingImage.label} />
      );
    }

    return (
      <img src={placeHolderImage} className={classNames(className, ' w-full h-full animate-fade-in')}
           alt={'placeholder-image'} />
    );
  };

  return (
    <div className="grid h-96 grid-cols-4 gap-2 grid-rows-2">
      <FallBackSafeImage listingImage={listingImages[0]}
                         className={'col-span-2 row-span-2 object-cover rounded-l-xl'} />
      <FallBackSafeImage listingImage={listingImages[1]}
                         className={'col-span-1 row-span-1 object-cover'} />
      <FallBackSafeImage listingImage={listingImages[2]}
                         className={'col-span-1 row-span-1 object-cover rounded-tr-xl'} />
      <FallBackSafeImage listingImage={listingImages[3]}
                         className={'col-span-1 row-span-1 object-cover'} />
      <FallBackSafeImage listingImage={listingImages[4]}
                         className={'col-span-1 row-span-1 object-cover rounded-br-xl'} />
    </div>);

};

export default ListingBentoGrid
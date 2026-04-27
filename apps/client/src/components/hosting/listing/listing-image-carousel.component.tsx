import placeHolderSVG from '../../../assets/images/placeholder.svg';
import { ListingImage } from '../../../types/listing/listing-image.type.ts';
import classNames from 'classnames';

export default function ListingImageCarousel({ listingImages, className }: {
  listingImages: ListingImage[],
  className?: string
}) {
  return (
    <div className={classNames('carousel rounded-box w-full aspect-square', className)}>
      {
        listingImages.length > 0 ?
          (
            listingImages.map((image, index) => (
              <div key={image.id} className="carousel-item w-full">
                <img
                  key={index}
                  src={image.publicUrl}
                  className="w-full object-cover"
                  alt={`image-${index}`} />
              </div>
            ))
          ) :
          (
            <img src={placeHolderSVG} alt={'placeholder'}
                 className={'aspect-square rounded-xl'} />
          )
      }

    </div>

  );
}
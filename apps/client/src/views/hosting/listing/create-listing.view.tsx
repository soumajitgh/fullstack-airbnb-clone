import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImageFile } from '../../../types/files/image-file.type.ts';
import { LatLngLiteral } from '../../../types/location.type.ts';
import { toast } from 'react-toastify';
import { CreateListingDto } from '../../../hooks/api/listing/dto/listing.dto.ts';
import CreateListingSuccessComponent from './components/create-listing-success.component.tsx';
import ImageDropzoneListingForm from './components/listing-form/add-listing-form/image-dropzone.component.tsx';
import LocationSelectorInput from './components/listing-form/add-listing-form/location-selector.component.tsx';
import { useMutateCreateListing } from '../../../hooks/api/listing/useCreateListing.hook.ts';

type MetaDataInputs = {
  title: string
  description: string
  costing: number
}

export default function CreateListingView() {

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<MetaDataInputs>();

  const [files, setFiles] = useState<ImageFile[]>([]);
  const [location, setLocation] = useState<LatLngLiteral | null>(null);

  const { mutate: createListing, isPending } = useMutateCreateListing({});

  const onSubmit: SubmitHandler<MetaDataInputs> = async (hookFormData) => {
    if (!location) {
      toast.error('Please enter a valid location');
      return;
    }

    const createListingDto: CreateListingDto = {
      metadata: { location, ...hookFormData },
      images: files.map((file) => ({ category: 'exterior', imageFile: file })),
    };

    createListing(createListingDto, {
      onSuccess: () => {
        toast.success('Listing created successfully');
        setIsFormSubmitted(true);
        handleReset();
      },
      onError: () => {
        toast.error('Failed to create listing');
      },
    });
  };

  const handleReset = () => {
    reset();
    setFiles([]);
    setLocation(null);
  };

  const FormFields = () => (
    <div className={'grid grid-cols-2 gap-4'}>
      <input type="text" className="input input-bordered"
             placeholder="Title" {...register('title', { required: true })} />


      <label className="input input-bordered flex items-center gap-2">
        $
        <input type="number" className="grow"
               placeholder="Costing" {...register('costing', { required: true })} />
        per night
      </label>
      {errors.costing && <span>This field is required</span>}

      <textarea className="textarea textarea-bordered col-span-2 h-72"
                placeholder="Description" {...register('description')}></textarea>
    </div>
  );

  return isFormSubmitted ?
    (<CreateListingSuccessComponent />) :
    (<>
      <div className={'w-full mt-2 mb-8 flex items-center justify-between'}>
        <h3 className={'text-3xl font-bold'}>Become a host !</h3>

        <button disabled={!(location && isValid)} value={'submit'} type={'submit'} form={'createListingForm'}
                className={'btn btn-primary'}>
          {
            isPending ? 'Creating...' : 'Create Listing'
          }
        </button>
      </div>


      <>
        <form role={'tablist'} id={'createListingForm'} className={'tabs tabs-lifted'}
              onSubmit={handleSubmit(onSubmit)}>
          {/*metadata section*/}
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Metadata"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <FormFields />
          </div>

          {/*image dropzone section*/}
          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Images" />
          <div id={'image-dropzone'} role="tabpanel"
               className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <ImageDropzoneListingForm files={files} setFiles={setFiles} />
          </div>

          {/*location selector section*/}
          <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Location" />
          <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
            <LocationSelectorInput location={location} setLocation={setLocation} />
          </div>
        </form>
      </>
    </>);
}

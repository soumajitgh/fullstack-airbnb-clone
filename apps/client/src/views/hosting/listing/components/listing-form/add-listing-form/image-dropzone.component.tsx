import React, { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { ImageFile } from '../../../../../../types/files/image-file.type.ts';
import { toast } from 'react-toastify';

type ImageDropzoneProps = {
  files: ImageFile[];
  setFiles: React.Dispatch<React.SetStateAction<ImageFile[]>>;
}

export default function ImageDropzoneListingForm({ files, setFiles }: ImageDropzoneProps) {

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      fileRejections.forEach((rejectedFiles) => {
        rejectedFiles.errors.map((err) => {
          toast.error(err.message);
        });
      });
    }

    if (acceptedFiles.length > 0) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })),
      ]);
    }
  }, [setFiles]);

  const onDelete = (imageFile: ImageFile) => {
    setFiles(previousFiles =>
      previousFiles.filter((file) => file.preview !== imageFile.preview),
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: {
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
    },
    maxSize: 5 * 1240 * 1000,
  });

  return (
    <div className={'grid grid-cols-2 gap-4 w-full'}>
      <div
        className={'flex items-center justify-center bg-base-200 aspect-video rounded-xl'} {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the images here ...</p> :
            <p className={'text-center text-gray-500'}>Drop images here or click to select images</p>

        }
      </div>


      {
        files.length > 0 && (
          <>
            <div className={'flex gap-4 flex-col'}>
              <div className={'grid grid-cols-2 gap-4'}>
                {
                  files.map(
                    (file, index) => (
                      <div key={index} className={'relative'}>
                        <img src={file.preview} alt={file.name}
                             onLoad={() => {
                               URL.revokeObjectURL(file.preview);
                             }}
                             className={'aspect-square object-cover rounded-xl'} />
                        <button className={'btn btn-square btn-error absolute top-2 right-2 text-error-content'}
                                onClick={() => {
                                  onDelete(file);
                                }}>
                          <span className={'material-symbols-rounded'}>close</span>
                        </button>
                      </div>
                    ),
                  )
                }
              </div>
            </div>
          </>

        )
      }

    </div>
  );
}

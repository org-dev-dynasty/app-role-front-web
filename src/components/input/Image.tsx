import { forwardRef, useState } from 'react';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';

const ImageInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ value, onChange, ...props }, ref) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [preview, setPreview] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setLoadingImage(true);

    if (!file) {
      setLoadingImage(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
      setLoadingImage(false);
    };
    reader.readAsDataURL(file);

    onChange?.(event);
  };

  return (
    <div className='flex flex-col'>
      <Input
        type={'file'}
        ref={ref}
        onChange={handleChange}
        value={value || ''}
        {...props}
      />

      {preview && (
        <div className='w-full aspect-square'>
          {loadingImage ? (
            <Skeleton />
          ) : (
            <img
              src={preview}
              alt='Preview'
              className='mt-2 w-full h-full object-cover rounded-md border'
            />
          )}
        </div>
      )}
    </div>
  );
});

ImageInput.displayName = 'ImageInput';
export default ImageInput;

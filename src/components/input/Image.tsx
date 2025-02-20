import React, { forwardRef, useState } from 'react';
import { Input } from '../ui/input';       // Caso seja um componente estilizado
import { Skeleton } from '../ui/skeleton'; // Se você já usa Skeleton no loading

// Omitimos o onChange nativo e definimos nossa prop onChange como (files: File[]) => void
type ImageInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange?: (files: File[]) => void;
};

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ onChange, multiple, ...props }, ref) => {
    const [loadingImage, setLoadingImage] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) {
        setPreviews([]);
        onChange?.([]); // chama a prop com array vazio
        return;
      }

      setLoadingImage(true);

      // Convertemos para array “real”
      const filesArray = Array.from(files);

      // Fazemos a leitura assíncrona de cada arquivo em base64
      const toBase64 = (file: File) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

      const results = await Promise.all(filesArray.map(toBase64));

      setPreviews(results);
      setLoadingImage(false);

      // Finalmente chamamos onChange do componente, passando o array de Files
      onChange?.(filesArray);
    };

    return (
      <div className="flex flex-col">
        <Input
          type="file"
          ref={ref}
          multiple={multiple} 
          onChange={handleChange}
          {...props}
        />

        {loadingImage && (
          <Skeleton className="w-full h-40 mt-2" />
        )}

        {/* Se não está carregando e temos prévias */}
        {!loadingImage && previews.length > 0 && (
          <div className="mt-2 flex flex-row gap-2 overflow-x-auto">
            {previews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index}`}
                className="w-40 h-40 object-cover rounded-md border"
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

ImageInput.displayName = 'ImageInput';
export default ImageInput;

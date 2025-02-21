import React, { forwardRef, useState } from 'react';
import { Input } from '../ui/input';       // Caso seja um componente estilizado
import { Skeleton } from '../ui/skeleton'; // Se você já usa Skeleton no loading

// Omitimos o onChange nativo e definimos nossa prop onChange como (files: File[]) => void
type ImageInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange?: (files: File[]) => void;
  maxSize?: number; // Propriedade para definir o tamanho máximo em MB
};

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  ({ onChange, multiple, maxSize = 8, ...props }, ref) => {
    const [loadingImage, setLoadingImage] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) {
        setPreviews([]);
        onChange?.([]); // chama a prop com array vazio
        return;
      }

      // Verifica o tamanho dos arquivos
      const filesArray = Array.from(files);
      const maxSizeBytes = maxSize * 1024 * 1024; // Converte MB para bytes

      for (const file of filesArray) {
        if (file.size > maxSizeBytes) {
          setError(`O arquivo "${file.name}" excede o limite de ${maxSize} MB.`);
          setPreviews([]);
          onChange?.([]); // Limpa os arquivos inválidos
          return;
        }
      }

      setError(null); // Limpa o erro anterior
      setLoadingImage(true);

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

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}

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
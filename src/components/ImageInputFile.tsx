import { FileImage, FileVideo } from '@phosphor-icons/react'
import {
  ChangeEvent,
  useEffect,
  useMemo,
  useState
} from 'react'


interface VideoInputFormProps {
  onImageUploaded: (image: File) => void
  aspect?: string
  label: string
  defaultValue?: string
}

export function ImageInputFile(props: VideoInputFormProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget

    if (!files) return

    const selectedFile = files[0]

    setImageFile(selectedFile)

    props.onImageUploaded(selectedFile)

    console.log('AAAAAAAAAAAAAAAA')
    console.log(imageFile)
  }

  useEffect(() => {
    console.log(imageFile)
  }, [imageFile])

  // const handleVideoUpload = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()

  //   if (!imageFile) return

  // }

  const previewURL = useMemo(() => {
    if (!imageFile) {
      return
    }

    return URL.createObjectURL(imageFile)
  }, [imageFile])

  return (
    <form className="space-y-6 text-white">
      <label
        htmlFor={'video-' + props.aspect}
        className={`relative flex rounded-md ${
          props.aspect == 'video' ? 'aspect-video' : 'aspect-square'
        } cursor-pointer border border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 overflow-hidden`}
      >
        {imageFile ? (
          <img
            src={previewURL}
            className="pointer-events-none absolute inset-0 w-full h-full object-contain rounded-md"
          />
        ) : props.defaultValue ? (
          <img
            src={props.defaultValue}
            className="pointer-events-none absolute inset-0 w-full h-full object-contain rounded-md"
          />
        ) : (
          <>
            {props.aspect == 'video' ? (
              <FileVideo size={32} />
            ) : (
              <FileImage size={32} />
            )}
            <span>{props.label}</span>
          </>
        )}
      </label>
      <input
        type="file"
        id={'video-' + props.aspect}
        accept="image/*"
        className="sr-only"
        onChange={handleFileSelected}
      />
    </form>
  )
}

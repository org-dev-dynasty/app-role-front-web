import React from 'react';
import { Image, ImageProps } from 'primereact/image';


type InteractableImageProps = ImageProps & {
    src: string;
    alt: string;
};

export const InteractableImage = ({src, alt, className}: InteractableImageProps) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return(
        <Image
            src={src}
            alt={alt}
            className={className}
            pt={{
                image: {
                    className: `${isHovered ? 'transition-all duration-300 brightness-50' : 'teste'}`
                },
                toolbar: {
                    className: 'gap-x-8 pt-8 pr-6'
                },
                mask: {
                    className: 'bg-black bg-opacity-90'
                },
                previewContainer: {
                    className: 'flex justify-center items-center'
                },
                preview: {
                    className: 'w-5/6'
                },
                button:{
                    onMouseEnter: () => setIsHovered(true),
                    onMouseLeave: () => setIsHovered(false),
                },
            }}
            preview
        />
    )
}
import { CaretCircleLeft, CaretCircleRight } from '@phosphor-icons/react';
import mock from '../assets/Home 3 ESCULRO-portrait.png';
import mock2 from '../assets/Filtros ESCURO-portrait.png';
import mock3 from '../assets/Perfil escuro-portrait.png';
import mock4 from '../assets/Perfil Org ESCURO1-portrait.png';
import { Image } from 'primereact/image';

const images = [
    mock,
    mock2,
    mock3,
    mock4
];

export const Carousel = ({ currentIndex, prevSlide, nextSlide }: { currentIndex: number, prevSlide: () => void, nextSlide: () => void }) => {
    return (
        <div className="relative w-full flex justify-center items-center">
            <button
                onClick={prevSlide}
                className="absolute left-0 transform -translate-y-1/2 text-light-purple mx-4"
            >
                <CaretCircleLeft size={36} />
            </button>

            <div className='w-1/6'/>

            <div className="relative w-[250px] overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)`}}
                >
                    {images.map((image, index) => (
                        <div key={index} className="flex-shrink-0 w-full h-auto">
                            <Image
                                src={image}
                                alt={`Slide ${index}`}
                                pt={{
                                    image: {
                                    },
                                    toolbar: {
                                        style: { gap: '10px', padding: 64 },
                                    },
                                    mask: {
                                        style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
                                    },
                                }}
                                preview
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className='w-1/6'/>

            <button
                onClick={nextSlide}
                className="absolute right-0 transform -translate-y-1/2 text-light-purple mx-4"
            >
                <CaretCircleRight size={36} />
            </button>
        </div>
    );
};

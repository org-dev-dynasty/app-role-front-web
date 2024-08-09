import { CaretCircleLeft, CaretCircleRight } from '@phosphor-icons/react';
import mock from '../assets/Home 3 ESCULRO-portrait.png';
import mock2 from '../assets/Filtros ESCURO-portrait.png';
import mock3 from '../assets/Perfil escuro-portrait.png';
import mock4 from '../assets/Perfil Org ESCURO1-portrait.png';
import {InteractableImage} from "./InteractableImage.tsx";

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
                className="absolute carousel-button-left-spacing sm:carousel-button-left-spacing lg:carousel-button-left-spacing xl:carousel-button-left-spacing transform -translate-x-full translate-y-[-50%] text-light-purple p-2 rounded-full hover:bg-black hover:bg-opacity-20 transition-all duration-300"
            >
                <CaretCircleLeft className="xl:w-14 xl:h-14 w-9 h-9 max-lg:w-16 max-lg:h-16 max-sm:w-12 max-sm:h-12" />
            </button>

            <div className="relative w-[250px] lg:w-[200px] xl:w-[250px] overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image : string, index) => (
                        <div key={index} className="flex-shrink-0 w-full h-auto">
                            <InteractableImage
                                src={image}
                                alt={`Slide ${index}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={nextSlide}
                className="absolute carousel-button-right-spacing sm:carousel-button-right-spacing lg:carousel-button-right-spacing xl:carousel-button-right-spacing transform translate-x-full translate-y-[-50%] text-light-purple p-2 rounded-full hover:bg-black hover:bg-opacity-20 transition-all duration-300"
            >
                <CaretCircleRight className="xl:w-14 xl:h-14 w-9 h-9 max-lg:w-16 max-lg:h-16 max-sm:w-12 max-sm:h-12" />
            </button>
        </div>
    );
};

import React from 'react';
import { CaretCircleLeft, CaretCircleRight } from '@phosphor-icons/react';
import mock from '../assets/Home 3 ESCULRO-portrait.png';
import mock2 from '../assets/Filtros ESCURO-portrait.png';
import mock3 from '../assets/Perfil escuro-portrait.png';
import mock4 from '../assets/Perfil Org ESCURO1-portrait.png';

const images = [
    mock,
    mock2,
    mock3,
    mock4
];

export const Carousel = ({ currentIndex, prevSlide, nextSlide }) => {

    return (
        <div className="relative w-5/6 flex justify-center items-center">
            <button
                onClick={prevSlide}
                className="absolute left-0 transform -translate-y-1/2 text-light-purple mx-4"
            >
                <CaretCircleLeft size={36} />
            </button>

            <div className="w-[250px] overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image: string, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Slide ${index}`}
                            className="w-full object-cover"
                        />
                    ))}
                </div>
            </div>

            <button
                onClick={nextSlide}
                className="absolute right-0 transform -translate-y-1/2 text-light-purple mx-4"
            >
                <CaretCircleRight size={36} />
            </button>
        </div>
    );
};

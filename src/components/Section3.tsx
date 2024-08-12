/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEffect, useRef, useState} from "react";
import { envs } from "../utils/envs";

const json = [
  {
    "id": 1,
    "name": "Crie Memórias",
    "image": `${envs.cloudfrontUrl}/section3_girls.jpeg`
  }, 
  {
    "id": 2,
    "name": "O seu ROLE Ideal!",
    "image": `${envs.cloudfrontUrl}/section3_holding_phone.jpg`
  }, 
  {
    "id": 3,
    "name": "Experiências Únicas",
    "image": `${envs.cloudfrontUrl}/section3_party_fire.jpg`
  },
  {
    "id": 4,
    "name": "Viva os ROLEs com Qualidade!",
    "image": `${envs.cloudfrontUrl}/section3_girl_in_pandora.jpeg`
  },
];

export const Section3 = () => {
    // const cardsRef = useRef<HTMLDivElement[]>([]);
    // const containerRef = useRef<HTMLDivElement>(null);
    // const textRefs = useRef<HTMLDivElement[]>([]);

    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);

    //     const container = containerRef.current;
    //     const totalWidth = container?.scrollWidth! - container?.clientWidth!;
    //     gsap.to(cardsRef.current, {
    //         scrollTrigger: {
    //             toggleActions: "none none none none",
    //             trigger: cardsRef.current,
    //             start: "20px 95%",
    //             scrub: true,
    //         },
    //         x: -totalWidth,
    //         ease: "none",
    //         duration: 1,
    //     });
    //     return () => {
    //         gsap.killTweensOf(cardsRef.current);
    //     };
    // }, []);

    // useEffect(() => {
    //     // Limpa as referências
    //     textRefs.current.forEach((ref: HTMLDivElement) => {
    //         if (ref) {
    //             const paragraphs = ref.querySelectorAll("p");
    //             paragraphs.forEach(paragraph => {
    //                 fitty(paragraph, {minSize: 12, maxSize: 48});
    //             });
    //         }
    //     });
    // }, [textRefs.current]);

  const sectionToScroll = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState(1);

  useEffect(() => {
    const sectionToScrollElement = sectionToScroll.current;
    let isScrolling: any;

    const smoothScroll = () => {
      const maxScrollLeft = sectionToScrollElement ? Math.round(
        sectionToScrollElement.scrollWidth - sectionToScrollElement.clientWidth
      ) : 0;

      if (
        sectionToScrollElement &&
        Math.round(sectionToScrollElement.scrollLeft) >= maxScrollLeft &&
        scrollDirection === 1
      ) {
        setTimeout(() => {
          setScrollDirection(-1);
        }, 2000);
      } else if (
        sectionToScrollElement &&
        Math.round(sectionToScrollElement.scrollLeft) <= 0 &&
        scrollDirection === -1
      ) {
        setTimeout(() => {
          setScrollDirection(1);
        }, 2000);
      }

      if (sectionToScrollElement) sectionToScrollElement.scrollLeft = sectionToScrollElement ? sectionToScrollElement.scrollLeft + scrollDirection * 2 : 0;

      isScrolling = requestAnimationFrame(smoothScroll);
    };

    smoothScroll();

    return () => {
      cancelAnimationFrame(isScrolling);
    };
  }, [scrollDirection]);


    return(
        <div id="explorar" className="flex flex-col justify-center font-chillax">
            <div className="flex justify-center items-center py-24">
                <p className="text-5xl text-white text-center drop-shadow-purple-mid px-2 max-sm:text-4xl font-medium">
                    <span className="font-semibold">Encontre</span> Eventos, <span
                    className="font-semibold">Conheça</span> Pessoas e <span className="font-semibold">Crie</span> Histórias
                </p>
            </div>

            <div ref={sectionToScroll} className="flex overflow-hidden font-nunito">
                {json.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-center items-center max-sm:size-5/6 max-md:size-2/3 max-lg:size-1/2 size-1/3 relative mx-3 flex-shrink-0"
                    >
                        <img alt={item.name} src={item.image} className="w-full h-full object-cover rounded-3xl"/>
                        <div
                             className="absolute bottom-4 backdrop-blur rounded-3xl bg-[rgba(29,29,29,0.4)] w-11/12 flex items-center justify-center">
                            <p className="max-md:text-lg max-lg:text-3xl text-2xl text-white inline text-center py-2 xl:py-6 px-6">{item.name}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center py-24 font-chillax">
                <p className="text-5xl text-white text-center drop-shadow-purple-mid px-2 max-sm:text-4xl font-semibold">
                    O <span className="font-semibold text-violet drop-shadow-purple-strong">ROLE</span> vai revolucionar
                    a sua vida noturna!
                </p>
            </div>
        </div>);
}


import { envs } from "../utils/envs";
import { IoTicket } from "react-icons/io5";
import { FaHeart, FaStar, FaGlassCheers } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { BackgroundBubbles } from "./BackgroundBubbles";

export function Header({ isNavbarOpened, isPopUpOpened }: { isNavbarOpened: boolean, isPopUpOpened: boolean }) {
  return <>
    <div className="absolute top-0 left-0 w-full h-full flex items-center overflow-hidden">
      <BackgroundBubbles isNavbarOpened={isNavbarOpened} isPopUpOpened={isPopUpOpened} />
    </div>
    <div className="w-5/12 flex justify-center flex-col gap-8 lg:ml-12 max-lg:w-[75%] pt-12">
      <h1 className="text-6xl max-lg:text-center max-lg:text-5xl font-chillax font-medium drop-shadow-purple-mid">O seu <span className="uppercase text-violet drop-shadow-purple-strong">role</span> ideal está aqui!</h1>

      <p className="text-xl font-satoshi font-regular max-lg:text-center drop-shadow-purple-mid">O app ROLE está vindo com tudo, encontre novas pessoas e descubra todos os eventos noturnos na sua cidade!</p>
      <p className="text-xl font-satoshi font-regular max-lg:text-center drop-shadow-purple-mid">Tudo de acordo com as suas preferências e gostos, aproveitando do melhor que a vida noturna tem a oferecer!</p>

      <div className="flex gap-4 text-4xl max-lg:hidden">
        <i onClick={() => window.open('https://www.instagram.com/app.role/', '_blank')} className="cursor-pointer pi pi-instagram transform hover:scale-125 ease-in-out duration-300"></i>
        <i onClick={() => window.open('https://www.tiktok.com/@approle', '_blank')} className="cursor-pointer pi pi-tiktok transform hover:scale-125 ease-in-out duration-300"></i>
        <i onClick={() => window.open('https://x.com/AppRolee', '_blank')} className="cursor-pointer pi pi-twitter transform hover:scale-125 ease-in-out duration-300"></i>
      </div>

      <p className="max-lg:hidden font-satoshi font-regular text-xl drop-shadow-purple">Acesse nossas redes sociais!</p>
    </div>

    {/* DESKTOP */}
    <div className="w-1/2 flex h-2/3 justify-center relative max-lg:hidden">
      <img className="animate-floatMockup w-[56%] h-[56%] object-contain mt-5" src={`${envs.cloudfrontUrl}/mockup_header_role.png`} alt="mockup_approle" />
      <FaHeart size={40} className="animate-floatEmojisLeft absolute top-[70%] left-[20%]" />
      <FaStar size={40} className="animate-floatEmojisLeft absolute top-[20%] left-[35%]" />
      <IoTicket size={40} className="animate-floatingEmojisRight absolute top-[80%] right-[45%]" />
      <FaLocationDot size={40} className="animate-floatingEmojisRight absolute top-[50%] right-[35%]" />
      <FaGlassCheers size={40} className="animate-floatingEmojisRight absolute top-[20%] right-[25%]" />
    </div>

    {/* TABLET */}
    <div className="flex relative items-end p-8 lg:hidden max-md:hidden">
      <img className="animate-floatMockup w-[56%] h-[56%] object-contain mt-5 ml-[60px]" src={`${envs.cloudfrontUrl}/mockup_header_role.png`} alt="mockup_approle" />
      <FaHeart size={32} className="animate-floatEmojisLeft absolute top-[20%] left-[25%]" />
      <FaStar size={32} className="animate-floatEmojisLeft absolute top-[60%] left-[15%]" />
      <IoTicket size={32} className="animate-floatingEmojisRight absolute top-[20%] right-[40%]" />
      <FaLocationDot size={32} className="animate-floatingEmojisRight absolute top-[50%] right-[50%]" />
      <FaGlassCheers size={32} className="animate-floatingEmojisRight absolute top-[80%] right-[60%]" />
      <div className="flex flex-col gap-4 text-4xl ml-12 lg:hidden">
        <i onClick={() => window.open('https://www.instagram.com/app.role/', '_blank')} className="cursor-pointer pi pi-instagram"></i>
        <i onClick={() => window.open('https://www.tiktok.com/@approle', '_blank')} className="cursor-pointer pi pi-tiktok"></i>
        <i onClick={() => window.open('https://x.com/AppRolee', '_blank')} className="cursor-pointer pi pi-twitter"></i>
      </div>
    </div>

    {/* MOBILE */}
    <div className="flex relative items-end p-8 md:hidden">
      <img className="animate-floatMockup w-[56%] h-[56%] object-contain mt-5 ml-[60px]" src={`${envs.cloudfrontUrl}/mockup_header_role.png`} alt="mockup_approle" />
      <FaHeart size={32} className="animate-floatEmojisLeft absolute top-[20%] left-[35%]" />
      <FaStar size={32} className="animate-floatEmojisLeft absolute top-[60%] left-[25%]" />
      <IoTicket size={32} className="animate-floatingEmojisRight absolute top-[20%] right-[30%]" />
      <FaLocationDot size={32} className="animate-floatingEmojisRight absolute top-[50%] right-[40%]" />
      <FaGlassCheers size={32} className="animate-floatingEmojisRight absolute top-[80%] right-[50%]" />
      <div className="flex flex-col gap-4 text-4xl ml-12 lg:hidden">
        <i onClick={() => window.open('https://www.instagram.com/app.role/', '_blank')} className="cursor-pointer pi pi-instagram"></i>
        <i onClick={() => window.open('https://www.tiktok.com/@approle', '_blank')} className="cursor-pointer pi pi-tiktok"></i>
        <i onClick={() => window.open('https://x.com/AppRolee', '_blank')} className="cursor-pointer pi pi-twitter"></i>
      </div>
    </div>
  </>
}

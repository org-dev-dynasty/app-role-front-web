import { X } from "@phosphor-icons/react";
import { NavbarItem } from "./NavbarItem";
import { handleScroll } from "../utils/handle_scroll";

export function NavbarMenu({ animationClass, handleMenu, openPopUp }: { animationClass: string, handleMenu: () => void, openPopUp: () => void  }) {
  return <>
    <div
        className={`${animationClass} bg-slate-900 bg-opacity-40 backdrop-blur z-40 w-screen h-full fixed top-0 right-0 `}>

      <div className="h-[60vh] round flex flex-col justify-around items-center transform">
        <button onClick={handleMenu}
                className='absolute top-4 right-4 lg:hidden hover:bg-black hover:opacity-20 rounded-full p-1'>
          <X className={`text-white text-3xl`}/>
        </button>

        <NavbarItem className="mt-10" onClick={() => {
          handleMenu();
          handleScroll('o_app');
        }}>O App</NavbarItem>
        <NavbarItem onClick={() => {
          handleMenu();
          handleScroll('diferenciais');
        }}>Diferenciais</NavbarItem>
        <NavbarItem onClick={() => {
          handleMenu();
          handleScroll('organizador');
        }}>Organizador</NavbarItem>
        <NavbarItem onClick={() => {
          handleMenu();
          handleScroll('contato');
        }}>Contato</NavbarItem>
        <button onClick={openPopUp} className='
        w-[128px] text-xl h-[32px]
        bg-gradient-to-r from-dark-purple via-purple via-70% to-light-purple
        rounded-2xl text-white cursor-pointer transform
        hover:brightness-75 ease-in-out duration-300'>Participe
        </button>
      </div>

    </div>
  </>
}
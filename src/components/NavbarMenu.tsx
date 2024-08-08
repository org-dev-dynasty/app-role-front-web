import { X } from "@phosphor-icons/react";
import { NavbarItem } from "./NavbarItem";
import { handleScroll } from "../utils/handle_scroll";

export function NavbarMenu({ animationClass, handleMenu }: { animationClass: string, handleMenu: () => void }) {
  return <>
    <div className={`${animationClass} bg-slate-900 round bg-opacity-40 backdrop-blur z-50 w-screen h-[60vh] fixed top-0 right-0 flex flex-col justify-around items-center transform`}>
      <div className="flex w-full justify-between">
        <div className="w-[30%]"></div>
        <NavbarItem className="pt-10" onClick={() => {
          handleMenu();
          handleScroll('quem_somos');
        }}>Quem Somos</NavbarItem>
        <button onClick={handleMenu} className='bg-transparent w-28 h-[12%] pl-[8%] flex justify-center items-center md:hidden'>
          <X className={`text-white text-3xl`}/>
        </button>
      </div>
      <NavbarItem onClick={() => {
        handleMenu();
        handleScroll('beneficios');
      }}>Benefícios</NavbarItem>
      <NavbarItem onClick={() => {
        handleMenu();
        handleScroll('organizador');
      }}>Organizador</NavbarItem>
      <NavbarItem onClick={() => {
        handleMenu();
        handleScroll('contato');
      }}>Contato</NavbarItem>
      <NavbarItem className="text-violet">Participe</NavbarItem>
    </div>
  </>
}
import { NavbarItem } from "./NavbarItem";

export function NavbarMenu() {
  return <div className="
    bg-[rgba(87,87,87,0.8)] backdrop-blur-3xl w-[40%] h-[60vh] fixed top-0 right-0 z-100 flex flex-col justify-around items-center
  ">
    <NavbarItem className="">Quem Somos</NavbarItem>
    <NavbarItem>Benefícios</NavbarItem>
    <NavbarItem>Organizador</NavbarItem>
    <NavbarItem>Contato</NavbarItem>
    <NavbarItem className="text-violet">Participe</NavbarItem>
  </div>
}
import { NavbarItem } from "./NavbarItem";

export function NavbarMenu() {
  return <div className="bg-[rgba(29,29,29,0.4)] w-[40%] h-[60vh] fixed top- right-0 z-1000 flex flex-col justify-around items-center backdrop-blur">
    <NavbarItem className="">Quem Somos</NavbarItem>
    <NavbarItem>Benefícios</NavbarItem>
    <NavbarItem>Organizador</NavbarItem>
    <NavbarItem>Contato</NavbarItem>
    <NavbarItem className="text-violet">Participe</NavbarItem>
  </div>
}
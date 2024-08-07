import AppRoleNavbarLogo from '../assets/approle_logo_navbar.png';
import { List } from '@phosphor-icons/react';
import { NavbarItem } from './NavbarItem';
import { NavbarMenu } from './NavbarMenu';

export function Navbar({ onClickMenuResponsible, openMenu }: { onClickMenuResponsible: () => void, openMenu: boolean }) {
  return (
    <div className="w-screen h-14 bg-[rgba(29,29,29,0.4)] backdrop-blur flex rounded-b-3xl fixed top-0 z-40 max-sm:justify-between">
      <img src={AppRoleNavbarLogo} alt="AppRole Logo" className="h-10 m-2 mr-44" />        
      <div className='flex m-4 justify-around w-8/12 max-sm:hidden'>
        <NavbarItem>Quem Somos</NavbarItem>
        <NavbarItem>Benefícios</NavbarItem>
        <NavbarItem>Organizador</NavbarItem>
        <NavbarItem>Contato</NavbarItem>
        <button className='
        w-[16%] h-[100%] 
        bg-gradient-to-r from-dark-purple via-purple via-70% to-light-purple 
        rounded-2xl text-white cursor-pointer transform 
        hover:scale-110 ease-in-out duration-300'>Participe</button>
      </div>
      <button onClick={onClickMenuResponsible} className='bg-transparent w-full h-full pl-[8%] flex justify-center items-center md:hidden'>
        <List className='text-white text-3xl'/>
      </button>
      {openMenu && <NavbarMenu />}
    </div>
  )
}
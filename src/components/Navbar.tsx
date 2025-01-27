import { List } from '@phosphor-icons/react';
import { NavbarItem } from './NavbarItem';
import { NavbarMenu } from './NavbarMenu';
import { handleScroll } from '../utils/handle_scroll';
import { envs } from '../utils/envs';
import { useNavigate } from 'react-router-dom';

export function Navbar({
  onClickMenuResponsible,
  openMenu,
  isAnimating,
  openPopUp,
}: {
  onClickMenuResponsible: () => void;
  openMenu: boolean;
  isAnimating: boolean;
  openPopUp: () => void;
}) {
  const animationMenu =
    openMenu && !isAnimating ? 'animate-slideInRight' : 'animate-slideOutRight';

  const navigate = useNavigate();

  return (
    <div
      className={`w-screen h-16 ${
        openMenu
          ? 'bg-transparent'
          : 'bg-[rgba(29,29,29,0.4)] backdrop-blur rounded-b-2xl'
      } flex rounded-b-3xl fixed top-0 z-40 font-nunito font-medium text-xl`}
    >
      <img
        src={`${envs.cloudfrontUrl}/approle_logo_navbar.png`}
        alt='AppRole Logo'
        className={`h-10 ml-8 mt-3 flex items-center justify-center ${
          openMenu ? 'hidden' : ''
        }`}
      />
      <div className='flex m-4 justify-center gap-x-12 w-full max-lg:hidden'>
        <NavbarItem onClick={() => handleScroll('o_app')}>O App</NavbarItem>
        <NavbarItem onClick={() => handleScroll('diferenciais')}>
          Diferenciais
        </NavbarItem>
        <NavbarItem onClick={() => handleScroll('organizador')}>
          Organizador
        </NavbarItem>
        <NavbarItem onClick={() => navigate('/faq')}>FAQ</NavbarItem>
        <NavbarItem onClick={() => navigate('/support')}>Suporte</NavbarItem>
        <NavbarItem
          className='md:mr-20'
          onClick={() => handleScroll('contato')}
        >
          Contato
        </NavbarItem>
        <button
          onClick={openPopUp}
          className='
        w-[128px] text-xl
        bg-gradient-to-r from-dark-purple via-purple via-70% to-light-purple
        rounded-2xl text-white cursor-pointer transform
        hover:brightness-75 ease-in-out duration-300'
        >
          Participe
        </button>
      </div>
      <button
        onClick={onClickMenuResponsible}
        className='bg-transparent w-full h-full pr-8 flex justify-end items-center lg:hidden'
      >
        {!openMenu && (
          <List className={`text-white text-3xl fill-white`} size={36} />
        )}
      </button>
      {openMenu && (
        <NavbarMenu
          animationClass={animationMenu}
          handleMenu={onClickMenuResponsible}
          openPopUp={openPopUp}
        />
      )}
    </div>
  );
}

import AppRoleNavbarLogo from '../assets/approle_logo_navbar.png';

export function Navbar() {
  return (
    <div className="w-full h-14 bg-transparent flex rounded-b-xl">
      <img src={AppRoleNavbarLogo} alt="AppRole Logo" className="h-10 m-2 mr-44" />
      <div className='flex m-4 justify-around w-8/12'>
        <h1 className="text-lg font-light text-white cursor-pointer">Quem Somos</h1>
        <h1 className="text-lg font-light text-white cursor-pointer">Benefícios</h1>
        <h1 className="text-lg font-light text-white cursor-pointer">Organizador</h1>
        <h1 className="text-lg font-light text-white cursor-pointer">Contato</h1>
      </div>
    </div>
  )
}
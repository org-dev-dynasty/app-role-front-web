import Spline from "@splinetool/react-spline";
import dash from '../assets/Dashboard_1.png';

export function Header() {
  return <> 
  <div className="w-5/12 flex justify-center flex-col gap-8 lg:ml-12 max-lg:w-[75%] pt-12">
    <h1 className="text-6xl max-lg:text-center max-lg:text-5xl font-chillax font-medium drop-shadow-purple-mid">O seu <span className="uppercase text-violet drop-shadow-purple-strong">role</span> ideal está aqui!</h1>

    <p className="text-xl font-chillax font-light max-lg:text-center drop-shadow-purple-mid pr-9">O app ROLE está vindo com tudo, encontre novas pessoas e descubra todos os eventos noturnos na sua cidade!</p>
    <p className="text-xl font-chillax font-light max-lg:text-center drop-shadow-purple-mid pr-9">Tudo de acordo com as suas preferências e gostos, aproveitando do melhor que a vida noturna tem a oferecer!</p>

    <div className="flex gap-4 text-4xl max-lg:hidden">
      <i onClick={() => {
        window.open('https://www.instagram.com/app.role/', '_blank');
      }} className="cursor-pointer pi pi-instagram transform
        hover:scale-125 ease-in-out duration-300"></i>
      <i onClick={() => {
        window.open('https://www.tiktok.com/@approle', '_blank');
      }} className="cursor-pointer pi pi-tiktok transform
        hover:scale-125 ease-in-out duration-300"></i>
      <i onClick={() => {
        window.open('https://x.com/AppRolee', '_blank');
      }} className="cursor-pointer pi pi-twitter transform
        hover:scale-125 ease-in-out duration-300"></i>
    </div>

    <p className="max-lg:hidden text-xl drop-shadow-purple">Acesse nossas redes sociais!</p>
  </div>
  <div className="w-1/2 flex justify-center relative max-lg:w-full max-lg:hidden">
    <img src={dash} alt="Imagem de dashboard"/>
    <Spline
      className="absolute top-0 pointer-events-auto"
      scene="https://prod.spline.design/YsywGClJ43grZrVj/scene.splinecode"
    />
  </div>

  <div className="flex items-end p-8">
    <Spline
      className="hidden max-lg:block"
      scene="https://prod.spline.design/YsywGClJ43grZrVj/scene.splinecode"
    />
    <div className="flex flex-col gap-4 text-4xl lg:hidden">
      <i onClick={() => {
        window.open('https://www.instagram.com/app.role/', '_blank');
      }} className="cursor-pointer pi pi-instagram"></i>
      <i onClick={() => {
        window.open('https://www.tiktok.com/@approle', '_blank');
      }} className="cursor-pointer pi pi-tiktok"></i>
      <i onClick={() => {
        window.open('https://x.com/AppRolee', '_blank');
      }} className="cursor-pointer pi pi-twitter"></i>
    </div>
  </div>
</>
}
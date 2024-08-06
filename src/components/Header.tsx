import Spline from "@splinetool/react-spline";
import dash from '../assets/Dashboard_1.png';

export function Header() {
  return <> 
  <div className="w-1/3 flex justify-center flex-col gap-8 lg:ml-8 max-lg:w-[75%]">
    <h1 className="text-6xl max-lg:text-center max-lg:text-5xl">O seu <span className="uppercase font-bold text-violet">role</span> ideal está aqui!</h1>

    <p className="text-xl font-light max-lg:text-center">O app ROLE está vindo com tudo, encontre novas pessoas e descubra todos os eventos noturnos na sua cidade!</p>
    <p className="text-xl font-light max-lg:text-center">Tudo de acordo com as suas preferências e gostos, aproveitando do melhor que a vida noturna tem a oferecer!</p>

    <div className="flex gap-4 text-4xl max-lg:hidden">
      <i className="cursor-pointer pi pi-instagram"></i>
      <i className="cursor-pointer pi pi-tiktok"></i>
      <i className="cursor-pointer pi pi-twitter"></i>
    </div>

    <p className="max-lg:hidden">Acesse nossas redes sociais!</p>
  </div>
  <div className="w-1/2 flex justify-center relative max-lg:w-full max-lg:hidden">
    <img src={dash} alt="Imagem de dashboard"/>
    <Spline className="absolute top-0 pointer-events-auto"
      scene="https://prod.spline.design/YsywGClJ43grZrVj/scene.splinecode"
    />
  </div>

  <div className="flex items-end p-8">
    <Spline
      className="hidden max-lg:block"
      scene="https://prod.spline.design/YsywGClJ43grZrVj/scene.splinecode"
    />
    <div className="flex flex-col gap-4 text-4xl lg:hidden">
      <i className="cursor-pointer pi pi-instagram"></i>
      <i className="cursor-pointer pi pi-tiktok"></i>
      <i className="cursor-pointer pi pi-twitter"></i>
    </div>
  </div>
</>
}
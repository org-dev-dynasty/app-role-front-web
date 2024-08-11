import { envs } from "../utils/envs";
import { BackgroundBubbles } from "./BackgroundBubbles";

export function Header({ isNavbarOpened, isPopUpOpened }: { isNavbarOpened: boolean, isPopUpOpened: boolean }) {
  return <>
  <BackgroundBubbles isNavbarOpened={isNavbarOpened} isPopUpOpened={isPopUpOpened} />
  <div className="w-5/12 flex justify-center flex-col gap-8 lg:ml-12 max-lg:w-[75%] pt-12">
    <h1 className="text-6xl max-lg:text-center max-lg:text-5xl font-chillax font-medium drop-shadow-purple-mid">O seu <span className="uppercase text-violet drop-shadow-purple-strong">role</span> ideal está aqui!</h1>

    <p className="text-xl font-chillax font-light max-lg:text-center drop-shadow-purple-mid ">O app ROLE está vindo com tudo, encontre novas pessoas e descubra todos os eventos noturnos na sua cidade!</p>
    <p className="text-xl font-chillax font-light max-lg:text-center drop-shadow-purple-mid ">Tudo de acordo com as suas preferências e gostos, aproveitando do melhor que a vida noturna tem a oferecer!</p>

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
  <div className="w-1/2 flex h-2/3 justify-center relative max-lg:w-full max-lg:hidden">
    <div className="flex flex-col pl-10 absolute z-40 left-[28%] top-1/3">
      <img src={`${envs.cloudfrontUrl}/purple_heart_emoji.png`} className="animate-floatEmojisLeft z-40 absolute -top-[60px] -right-[60px]"/>
      <img src={`${envs.cloudfrontUrl}/speaking_head_emoji.png`}  className="animate-floatEmojisLeft z-40 absolute right-[40px] top-[160px]"/>
    </div>
    <img className="animate-floatMockup w-[56%] h-[56%] object-contain mt-5" src={`${envs.cloudfrontUrl}/mockup_header_role.png`} alt="mockup_approle"/>
    <div className="flex flex-col">
      <img src={`${envs.cloudfrontUrl}/star_emoji.png`}  className="animate-floatingEmojisRight absolute right-[160px] top-[10px] w-[40px] h-[40px] object-contain"/>
      <img src={`${envs.cloudfrontUrl}/admission_tickets_emoji.png`}  className="animate-floatingEmojisRight absolute right-[190px] top-[200px] w-[40px] h-[40px] object-contain"/>
      <img src={`${envs.cloudfrontUrl}/beers_emoji.png`} className="animate-floatingEmojisRight absolute right-[270px] top-[364px] w-[40px] h-[40px] object-contain"/>
    </div>

  </div>

  <div className="flex items-end p-8 lg:hidden">
    <div className="flex flex-col pl-10 absolute z-40 left-[30%] top-1/3">
      <img src={`${envs.cloudfrontUrl}/purple_heart_emoji.png`} className="animate-floatEmojisLeft z-40 absolute w-[28px] -bottom-[360px] left-[32px]"/>
      <img src={`${envs.cloudfrontUrl}/speaking_head_emoji.png`}  className="animate-floatEmojisLeft z-40 absolute right-[40px] top-[480px]"/>
    </div>
    <img className="animate-floatMockup w-[56%] h-[56%] object-contain mt-5 ml-[60px]" src={`${envs.cloudfrontUrl}/mockup_header_role.png`} alt="mockup_approle"/>
    <div className="flex flex-col">
      <img src={`${envs.cloudfrontUrl}/star_emoji.png`}  className="animate-floatingEmojisRight absolute right-[112px] top-[600px] w-[28px] h-[28px] object-contain"/>
      <img src={`${envs.cloudfrontUrl}/admission_tickets_emoji.png`}  className="animate-floatingEmojisRight absolute right-[140px] top-[700px] w-[28px] h-[28px] object-contain"/>
      <img src={`${envs.cloudfrontUrl}/beers_emoji.png}`}  className="animate-floatingEmojisRight absolute right-[180px] top-[780px] w-[40px] h-[40px] object-contain"/>
    </div>
    <div className="flex flex-col gap-4 text-4xl ml-12 lg:hidden">
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
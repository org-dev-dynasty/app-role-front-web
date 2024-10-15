import { Pen } from "@phosphor-icons/react"
import EventCard from "../../../components/EventCard"

const institute =
{
  "institute_id": "1",
  "name": "Instituto de Exemplo",
  "description": "Um instituto dedicado à educação de qualidade.",
  "institute_type": "ESTABELECIMENTO_FIXO",
  "partner_type": "PROMOTER_PARTNER",
  "phone": "123456789",
  "logo_photo": "url_para_logo.jpg",
  "address": "Rua Exemplo, 123",
  "price": 100,
  "district_id": "district_1",
  "photos_url": [
    "url_para_foto_1.jpg",
    "url_para_foto_2.jpg",
  ],
  "events_id": [
    "event_1",
    "event_2",
    "event_3",
    "event_4",
    "event_5",
    "event_6"
  ]
}


export default function Institute() {
  function formatPartnerType(partnerType: string) {
    switch (partnerType) {
      case 'GLOBAL_PARTNER':
        return 'Parceiro Global';
      case 'PROMOTER_PARTNER':
        return 'Parceiro Promotor';
      case 'NO_PARTNER':
        return 'Sem Parceiro';
      default:
        return 'Tipo de Parceiro Desconhecido';
    }
  }
  function formatInstituteType(instituteType: string) {
    switch (instituteType) {
      case 'ESTABELECIMENTO_FIXO':
        return 'Estabelecimento Fixo';
      case 'AGENCIA_DE_FESTAS':
        return 'Agência de Festas';
      default:
        return 'Tipo de Instituição Desconhecido';
    }
  }

  return (
    <div className="h-full w-full flex flex-row bg-[#151515]" >
      <div className="relative w-[70%] flex flex-col py-6 bg-[#2A2A2A] items-center gap-10 px-4" >
        <Pen size={32} className="absolute top-8 left-[90%] bg-white w-16 h-16 rounded-lg hover:bg-white-purple hover:cursor-pointer" />
        <div className="flex items-center w-full gap-4">
          <div className="rounded-full h-72 w-72 bg-light-purple flex justify-center items-center">
            <img src={institute.logo_photo} alt="Logo do instituto" />
          </div>
          <div>
            <h1 className="text-white text-[60px]">{institute.name}</h1>
            <p className="text-white text-xl">{institute.description}</p>
          </div>
        </div>
        
        <div className="w-full h-72 bg-[#151515] rounded-xl py-4 flex flex-row text-white">
          <div className="flex flex-col gap-4 border-r h-full justify-center p-6 w-full">
            <div>
              <h1>Tipo de instituição:</h1>
              <h1>{formatInstituteType(institute.institute_type)}</h1>
            </div>
            <div>
              <h1>Tipo de Parceiro:</h1>
              <h1>{formatPartnerType(institute.partner_type)}</h1>
            </div>
            <div>
              <h1>Preço:</h1>
              <h1>{institute.price > 5 ? '$'.repeat(5) : '$'.repeat(institute.price)}</h1>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-l h-full justify-center p-6 w-full">
            <div>
              <h1>Telefone:</h1>
              <h1>{institute.phone}</h1>
            </div>
            <div>
              <h1>Endereço:</h1>
              <h1>{institute.address}</h1>
            </div>
            <div>
              <h1>Distrito:</h1>
              <h1>{institute.district_id}</h1>
            </div>
          </div>
        </div>
        <div className="w-full min-h-96 bg-[#151515] rounded-xl flex flex-row text-white">
          <div className="flex flex-col gap-4 h-full p-6 w-full">
            <div className="flex gap-4 flex-wrap">
              {institute.photos_url.map((photo_url) => {
                return (
                  <img className="min-w-52 border-2 min-h-72 border-dashed" src={photo_url} alt="Foto do instituto" />
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow gap-4 items-center pt-6">
        <div className="flex w-full justify-between items-center px-6">
          <h1 className="text-white text-[48px]">Roles</h1>
          <div className="bg-white w-16 h-16 flex justify-center items-center rounded-xl text-3xl hover:cursor-pointer hover:bg-white-purple">+</div>
        </div>
        {institute.events_id.map((event_id) => {
          return (
            <div id={event_id}>
              <EventCard name="Role" imageUrl="url_para_logo.jpg" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { useContext } from "react"
import EventCard from "../../../components/EventCard"
import { InstituteContext } from "../../../context/institute_context"

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
    "url_para_foto_2.jpg"
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
  const { getAllInstitutes } = useContext(InstituteContext)

    async function getAll() {
        getAllInstitutes()
    }
  return (
    <div className="h-full w-full flex flex-row bg-[#151515]" >
      <div className="h- w-[70%] flex flex-col py-6 bg-[#2A2A2A] items-center gap-10 px-4" >
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
              <h1>{institute.institute_type}</h1>
            </div>
            <div>
              <h1>Tipo de Parceiro:</h1>
              <h1>{institute.partner_type}</h1>
            </div>
            <div>
              <h1>Preço:</h1>
              <h1>{institute.price}</h1>
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
            <div className="flex gap-4">
              {institute.photos_url.map((photo_url) => {
                return (
                  <img className="min-w-56 border-2 min-h-72 border-dashed" src={photo_url} alt="Foto do instituto" />
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

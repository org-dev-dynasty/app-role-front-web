import { Pen } from "@phosphor-icons/react"
import EventCard from "../../../components/EventCard"
import UpdateInstituteModal from "../../../components/updateInstituteModal";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InstituteContext } from "../../../context/institute_context";

// const institute =
// {
//   "institute_id": "1",
//   "name": "Instituto de Exemplo",
//   "description": "Um instituto dedicado à educação de qualidade.",
//   "institute_type": "ESTABELECIMENTO_FIXO",
//   "partner_type": "PROMOTER_PARTNER",
//   "phone": "123456789",
//   "logo_photo": "url_para_logo.jpg",
//   "address": "Rua Exemplo, 123",
//   "price": 100,
//   "district_id": "district_1",
//   "photos_url": [
//     "url_para_foto_1.jpg",
//     "url_para_foto_2.jpg",
//   ],
//   "events_id": [
//     "event_1",
//     "event_2",
//     "event_3",
//     "event_4",
//     "event_5",
//     "event_6"
//   ]
// }


export default function Institute() {
  const { getInstituteById } = useContext(InstituteContext);
  const { instId } = useParams();
  const [institute, setInstitute] = useState({
    "institute_id": "",
    "name": "",
    "description": "",
    "institute_type": "",
    "partner_type": "",
    "phone": "",
    "logo_photo": "",
    "address": "",
    "price": 0,
    "district_id": "",
    "photos_url": [],
    "events_id": []
  });
  const [isUpdateInstituteModalOpen, setIsUpdateInstituteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  useEffect(() => {
    const fetchInstitute = async () => {
      if (instId) {
        const response = await getInstituteById(instId); // Faz a requisição
        console.log(response)
        setInstitute(response.institute); // Atualiza o estado com os dados do instituto
      }
    };

    fetchInstitute();
  }, [instId, getInstituteById]);

  return (
    <div className="h-full w-full flex flex-row bg-[#151515]" >
      {/* Verifica se o modal está aberto */}
      {isUpdateInstituteModalOpen && (
        <UpdateInstituteModal
          setIsUpdateInstituteModalOpen={setIsUpdateInstituteModalOpen} institute={institute}        />
      )}
      {isDeleteModalOpen && (
        <ConfirDelete setIsDeleteModalOpen={setIsDeleteModalOpen} />
      )}
      <div className="relative w-[70%] flex flex-col py-6 bg-[#2A2A2A] items-center gap-10 px-4" >
        <button className="absolute top-8 left-[76%] text-xl bg-red-500 w-32 h-16 rounded-lg hover:bg-red-400 duration-100 hover:cursor-pointer" onClick={()=>setIsDeleteModalOpen(true)}>Deletar</button>
        <Pen size={32} className="absolute top-8 left-[90%] bg-white w-16 h-16 rounded-lg hover:bg-white-purple hover:cursor-pointer" onClick={() => setIsUpdateInstituteModalOpen(true)} />
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

interface ConfirDeleteProps {
  setIsDeleteModalOpen: (isOpen: boolean) => void;
}

function ConfirDelete({ setIsDeleteModalOpen }: ConfirDeleteProps) {
  function handleCancelClick() {
    setIsDeleteModalOpen(false);
  }
  return (
    <div className="fixed h-full w-full backdrop-blur-md bg-black/50 flex z-50 justify-center items-center">
      <div
        className="rounded-lg bg-grayModal p-6 w-1/3 text-center"
        onClick={(e) => e.stopPropagation()} // Impede a propagação do clique para o fundo
      >
        <p className="text-white mb-4">Você tem certeza que deseja <p className="text-red-400 inline">deletar</p> este instituto?</p>
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 rounded-lg bg-gray-600 text-white" onClick={handleCancelClick}>Cancelar</button>
          <button className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-400 duration-100" onClick={handleCancelClick}>Deletar</button>
        </div>
      </div>
    </div>
  )
}

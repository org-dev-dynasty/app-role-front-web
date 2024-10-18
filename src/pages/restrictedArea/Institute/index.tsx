import { Pen } from "@phosphor-icons/react";
import EventCard from "../../../components/EventCard";
import UpdateInstituteModal from "../../../components/updateInstituteModal";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InstituteContext } from "../../../context/institute_context";

interface Institute {
  address: string;
  description: string;
  district_id: string;
  events_id: string[];
  institute_id: string;
  institute_type: string;
  logo_photo: string;
  name: string;
  partner_type: string;
  phone: string;
  photos_url: string[];
  price: number;
}

export default function Institute() {
  const { getInstituteById } = useContext(InstituteContext);
  const { instId } = useParams<{ instId: string }>();
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [isUpdateInstituteModalOpen, setIsUpdateInstituteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function formatPartnerType(partnerType: string) {
    switch (partnerType) {
      case "GLOBAL_PARTNER":
        return "Parceiro Global";
      case "PROMOTER_PARTNER":
        return "Parceiro Promotor";
      case "NO_PARTNER":
        return "Sem Parceiro";
      default:
        return "Tipo de Parceiro Desconhecido";
    }
  }

  function formatInstituteType(instituteType: string) {
    switch (instituteType) {
      case "ESTABELECIMENTO_FIXO":
        return "Estabelecimento Fixo";
      case "AGENCIA_DE_FESTAS":
        return "Agência de Festas";
      default:
        return "Tipo de Instituição Desconhecido";
    }
  }

  const [institute, setInstitute] = useState<Institute | null>(null); // Use null ao invés de um objeto vazio

  useEffect(() => {
    const fetchInstitute = async () => {
      if (instId) {
        const response = await getInstituteById(instId); // Faz a requisição
        console.log(response);
        if (response) {
          setInstitute(response); // Atualiza o estado com os dados do instituto
          setLoading(false)
        } else {
          console.log("Instituto não encontrado");
          setInstitute(null); // Atualiza o estado com null
        }
      }
    };

    fetchInstitute();
  }, [instId, getInstituteById]);

  if (!institute) {
    return <p className="text-white">Carregando ou nenhum instituto encontrado</p>; // Mensagem enquanto carrega
  }

  if (loading) {
    return <p className="text-white">Carregando...</p>;
  }


  return (
    <div className="h-full w-full flex flex-row bg-[#151515]">
      {isUpdateInstituteModalOpen && (
        <UpdateInstituteModal
          setIsUpdateInstituteModalOpen={setIsUpdateInstituteModalOpen}
          institute={institute}
        />
      )}
      {isDeleteModalOpen && <ConfirDelete setIsDeleteModalOpen={setIsDeleteModalOpen} />}

      <div className="relative w-[70%] flex flex-col py-6 bg-[#2A2A2A] items-center gap-10 px-4">
        <button
          className="absolute top-8 left-[76%] text-xl bg-red-500 w-32 h-16 rounded-lg hover:bg-red-400 duration-100 hover:cursor-pointer"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          Deletar
        </button>
        <Pen
          size={32}
          className="absolute top-8 left-[90%] bg-white w-16 h-16 rounded-lg hover:bg-white-purple hover:cursor-pointer"
          onClick={() => setIsUpdateInstituteModalOpen(true)}
        />

        <div className="flex items-center w-full gap-4">
          <div className="rounded-full h-72 w-72 bg-light-purple flex justify-center items-center">
            {institute.logo_photo ? (
              <img src={institute.logo_photo} alt="Logo do instituto" />
            ) : (
              <p className="text-white">Sem logo disponível</p>
            )}
          </div>
          <div>
            <h1 className="text-white text-[60px]">{institute.name || "Nome indisponível"}</h1>
            <p className="text-white text-xl">{institute.description || "Sem descrição"}</p>
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
              <h1>{institute.price > 5 ? "$".repeat(5) : "$".repeat(institute.price)}</h1>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-l h-full justify-center p-6 w-full">
            <div>
              <h1>Telefone:</h1>
              <h1>{institute.phone || "Telefone indisponível"}</h1>
            </div>
            <div>
              <h1>Endereço:</h1>
              <h1>{institute.address || "Endereço indisponível"}</h1>
            </div>
            <div>
              <h1>Distrito:</h1>
              <h1>{institute.district_id || "Distrito indisponível"}</h1>
            </div>
          </div>
        </div>

        <div className="w-full min-h-96 bg-[#151515] rounded-xl flex flex-row text-white">
          <div className="flex flex-col gap-4 h-full p-6 w-full">
            <div className="flex gap-4 flex-wrap">
              {institute.photos_url.length > 0 ? (
                institute.photos_url.map((photo_url, index) => (
                  <img
                    key={index}
                    className="min-w-52 border-2 min-h-72 border-dashed"
                    src={photo_url}
                    alt={`Foto do instituto ${index + 1}`}
                  />
                ))
              ) : (
                <p className="text-white">Sem fotos disponíveis</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow gap-4 items-center pt-6">
        <div className="flex w-full justify-between items-center px-6">
          <h1 className="text-white text-[48px]">Roles</h1>
          <div className="bg-white w-16 h-16 flex justify-center items-center rounded-xl text-3xl hover:cursor-pointer hover:bg-white-purple">
            +
          </div>
        </div>
        {institute.events_id.length > 0 ? (
          institute.events_id.map((eventId) => (
            <div key={eventId} id={eventId}>
              <EventCard name="Role" imageUrl="url_para_logo.jpg" />
            </div>
          ))
        ) : (
          <p className="text-white">Nenhum evento disponível</p>
        )}
      </div>
    </div>
  );
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
        <p className="text-white mb-4">
          Você tem certeza que deseja{" "}
          <span className="text-red-400">deletar</span> este instituto?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-green-500 p-4 rounded-lg w-[50%] text-white hover:bg-green-300 duration-150"
            onClick={handleCancelClick}
          >
            Cancelar
          </button>
          <button className="bg-red-500 p-4 rounded-lg w-[50%] text-white hover:bg-red-300 duration-150">
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

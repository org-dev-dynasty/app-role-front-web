/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pen } from "@phosphor-icons/react";
import EventCard from "../../../components/EventCard";
import UpdateInstituteModal from "../../../components/updateInstituteModal";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InstituteContext } from "../../../context/institute_context";
import { ClipLoader } from "react-spinners";
import { EventContext } from "../../../context/event_context";
import { EventType } from "../../../api/repositories/event_repository";
import { CreateEventModal } from "../../../components/CreateEventModal";
import { Bounce, toast } from "react-toastify";

interface Institute {
  institute_id: string;
  name: string;
  description: string;
  institute_type: string;
  phone?: string | undefined;
  logo_photo?: string;
  partner_type?: string | undefined;
  address?: string | undefined;
  price?: number | undefined;
  district_id?: string | undefined;
  events_id?: string[] | undefined;
}

const districts = [
  {
    id: 'ee6ba030-cebc-405b-b3e3-08f213cca415',
    name: 'Zona Sul'
  },
  {
    id: '5e3e0505-2b29-462d-91fc-d9f538ee8186',
    name: 'Zona Norte'
  },
  {
    id: '7d6b8023-2d03-4623-bc33-ebf58767c9b1',
    name: 'Zona Leste'
  },
  {
    id: '1477c1ff-bdb4-4e38-8415-b2da7163b3f7',
    name: 'Zona Oeste'
  },
  {
    id: '90fec991-6d11-4813-9482-343ebdca5514',
    name: 'Centro'
  }
]

export default function Institute() {
  const { getEventsByInstituteId } = useContext(EventContext);
  const { getInstituteById } = useContext(InstituteContext);
  const { instId } = useParams<{ instId: string }>();
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [isUpdateInstituteModalOpen, setIsUpdateInstituteModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [events, setEvents] = useState<EventType[] | null>([]);
  const navigate = useNavigate();
  const [ isCreatingEvent, setIsCreatingEvent ] = useState(false);

  function formatPartnerType(partnerType: string) {
    switch (partnerType) {
      case 'GLOBAL_PARTNER':
        return 'Parceiro Global'
      case 'PROMOTER_PARTNER':
        return 'Parceiro Promotor'
      case 'NO_PARTNER':
        return 'Sem Parceiro'
      default:
        return 'Tipo de Parceiro Desconhecido'
    }
  }

  function formatInstituteType(instituteType: string) {
    switch (instituteType) {
      case 'ESTABELECIMENTO_FIXO':
        return 'Estabelecimento Fixo'
      case 'AGENCIA_DE_FESTAS':
        return 'Agência de Festas'
      default:
        return 'Tipo de Instituição Desconhecido'
    }
  }

  const [institute, setInstitute] = useState<Institute | null>(null) // Use null ao invés de um objeto vazio

  const fetchEvents = async () => {
    if (institute) {
      try {
        const response = await getEventsByInstituteId(institute.institute_id)
        console.log("Events:", response);
        setEvents(response.events);
      } catch (error: any) {
        console.log('Erro ao buscar eventos: ' + error.message)
        setEvents(null)
      }
    }
  }

  const fetchInstitute = async () => {
    setLoading(true)
    if (instId) {
      const response = await getInstituteById(instId);
      console.log("response do institute:", response);
      if (response) {
        setInstitute(response);
        setLoading(false);
        console.log('instituto:', institute);
      } else {
        console.log('Instituto não encontrado')
        setInstitute(null)
      }
    }
  }

  const [updatedInstitute, setUpdatedInstitute] = useState(false);

  useEffect(() => {
    if (updatedInstitute) {
      toast.success('Instituto atualizado com sucesso', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      setUpdatedInstitute(false); // Reseta o estado após exibir o toast
    }
  }, [isUpdateInstituteModalOpen]);


  // confere se o token existe
  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);


  // atualiza instituto loading
  useEffect(() => {
    if (!isUpdateInstituteModalOpen) {
      setLoading(true);
      setTimeout(() => {
        fetchInstitute();
        setLoading(false);
      }, 700);
    }
  }, [instId, getInstituteById, isUpdateInstituteModalOpen]);


  // atualiza events quando se entra na pagina
  useEffect(() => {
    if (institute) {
      fetchEvents()
    }
  }, [institute, getEventsByInstituteId]);

  function refreshEvents() {
    setTimeout(() => {
      fetchInstitute()
      fetchEvents()
      console.log('Instituto e eventos atualizados')
    }, 2000)
  }

  function toggleIsCreatingEvent() {
    setIsCreatingEvent(!isCreatingEvent);
  }

  if (loading) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center bg-[#151515]">
        <ClipLoader color="#fff" loading={loading} size={150} />
      </div>
    )
  }

  if (!institute) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center bg-[#151515]">
        <h1 className="text-white">Só um momento...</h1>
        <ClipLoader color="#fff" loading={loading} size={150} />
      </div>
    )
  }

  const district = districts.find(d => d.id === institute.district_id)

  return (
    <div className="h-full w-full flex flex-col md:flex-row bg-[#151515]">
      {isUpdateInstituteModalOpen && (
        <UpdateInstituteModal
          setIsUpdateInstituteModalOpen={setIsUpdateInstituteModalOpen}
          institute={institute}
        />
      )}
      {isDeleteModalOpen && <ConfirDelete setIsDeleteModalOpen={setIsDeleteModalOpen} instituteId={instId} />}
      <div className="relative h-[100vh] w-[100%] md:w-[70%] flex flex-col py-6 bg-[#2A2A2A] items-center gap-10 px-4">
        <div className="flex flex-col md:flex-row items-center w-full gap-4">
          <div className="rounded-full h-[30rem] md:h-72 min-w-72 max-w-72 bg-light-purple flex justify-center items-center overflow-hidden">
            {institute.logo_photo ? (
              <img
                src={institute.logo_photo}
                alt="Logo do instituto"
                className="h-96 w-96 object-cover flex justify-center items-center"
              />
            ) : (
              <p className="text-white">Sem logo disponível</p>
            )}
          </div>
          <div className="flex flex-col h-full pb-14 justify-between flex-grow">
            <div className="flex flex-row w-full justify-between">
              <button
                className="text-xl bg-light-purple w-32 h-16 rounded-lg hover:bg-violet duration-100 hover:cursor-pointer"
                onClick={() => navigate('/institutes')}
              >
                <h1 className="text-white text-2xl">Voltar</h1>
              </button>
              <div className="flex gap-6">
                <button
                  className="text-xl bg-red-500 w-32 h-16 rounded-lg hover:bg-red-400 duration-100 hover:cursor-pointer"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <h1 className="text-white text-2xl">Deletar</h1>
                </button>

                <div
                  className="w-16 h-16 flex items-center justify-center bg-light-purple  rounded-lg hover:bg-violet duration-100 hover:cursor-pointer"
                  onClick={() => setIsUpdateInstituteModalOpen(true)}
                >
                  <Pen
                    size={32}
                    className='fill-white'
                  />
                </div>
              </div>
            </div>
            <div className="w-[80%]">
              <h1 className="text-white text-[60px] leading-[4.0rem]">
                {institute.name || 'Nome indisponível'}
              </h1>
              <p className="text-white text-xl">
                {institute.description || 'Sem descrição'}
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-fit bg-[#151515] rounded-xl py-4 flex flex-row text-white">
          <div className="flex flex-col gap-4 border-r h-full justify-center p-6 w-full">
            <div className="bg-[#2a2a2a] p-2 pb-4 rounded-lg flex justify-center items-center flex-col gap-2 shadow-lg">
              <h1 className="h-8 w-1/2 rounded-lg bg-[#444] flex justify-center items-center shadow-md">
                Telefone:
              </h1>
              <h1>{institute.phone || 'Telefone indisponível'}</h1>
            </div>
            <div className="bg-[#2a2a2a] p-2 pb-4 rounded-lg flex justify-center items-center flex-col gap-2 shadow-lg">
              <h1 className="h-8 w-1/2 rounded-lg bg-[#444] flex justify-center items-center shadow-md">
                Distrito:
              </h1>
              <h1>{district ? district.name : 'Distrito indisponível'}</h1>
            </div>
            <div className="bg-[#2a2a2a] p-2 pb-4 rounded-lg flex justify-center items-center flex-col gap-2 shadow-lg">
              <h1 className="h-8 w-1/2 rounded-lg bg-[#444] flex justify-center items-center shadow-md">
                Endereço:
              </h1>
              <h1>{institute.address || 'Endereço indisponível'}</h1>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-l h-full justify-center p-6 w-full">
            <div className="bg-[#2a2a2a] p-2 pb-4 rounded-lg flex justify-center items-center flex-col gap-2 shadow-lg">
              <h1 className="h-8 w-1/2 rounded-lg bg-[#444] flex justify-center items-center shadow-md">
                Tipo de instituição:
              </h1>
              <h1>{formatInstituteType(institute.institute_type)}</h1>
            </div>
            <div className="bg-[#2a2a2a] p-2 pb-4 rounded-lg flex justify-center items-center flex-col gap-2 shadow-lg">
              <h1 className="h-8 w-1/2 rounded-lg bg-[#444] flex justify-center items-center shadow-md">Tipo de Parceiro:</h1>
              <h1>{formatPartnerType(institute.partner_type || "NO_PARTNER")}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow gap-4 items-center pt-6">
        <div className="flex w-full justify-between items-center px-6">
          <h1 className="text-white text-[48px]">Roles</h1>
          <div className="bg-white w-16 h-16 flex justify-center items-center rounded-xl text-3xl hover:cursor-pointer hover:bg-white-purple">
            <CreateEventModal onEventCreated={() => refreshEvents()} isCreatingEvent={() => toggleCreatingEvent()} />
          </div>
        </div>
        <div className="border-t-2 border-white rounded-3xl flex flex-col h-[calc(100vh-7rem)] overflow-y-scroll items-center w-full">
          {events && events.length > 0 ? (
            events.map((event, eventId) => (
              <div key={eventId}>
                <EventCard name={event.name} imageUrl={event.bannerUrl || ''} onclick={() => navigate(`/role/${event.eventId}`)} />
              </div>
            ))
          ) : (
            <p className="text-white">Nenhum evento disponível</p>
          )}
        </div>
      </div>
    </div>
  )
}

interface ConfirDeleteProps {
  setIsDeleteModalOpen: (isOpen: boolean) => void
  instituteId?: string
}

function ConfirDelete({
  setIsDeleteModalOpen,
  instituteId
}: ConfirDeleteProps) {
  const { deleteInstituteById } = useContext(InstituteContext)
  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate()

  function handleCancelClick() {
    setIsDeleteModalOpen(false)
  }

  const handleDeleteClick = async () => {
    setClicked(true);
    if (deleteInstituteById) {
      const resp = await deleteInstituteById(instituteId || "");
      if (resp.status === 200) {
        setClicked(false);
        setIsDeleteModalOpen(false);
        navigate("/institutes");
        toast.success("Instituto deletado com sucesso", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        return
      } else {
        toast.error(`${resp}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        return
      }
      setClicked(false);
      setIsDeleteModalOpen(false);
      navigate("/institutes");
    } else {
      console.error("deleteInstituteById is undefined");
    }
  }

  return (
    <div className="fixed h-full w-full backdrop-blur-md bg-black/50 flex z-50 justify-center items-center">
      <div
        className="rounded-lg bg-grayModal p-6 w-1/3 text-center transition-opacity duration-300"
        onClick={e => e.stopPropagation()} // Impede a propagação do clique para o fundo
      >
        <p className="text-white text-xl mb-4">
          Você tem certeza que deseja{' '}
          <span className="text-red-400">deletar</span> este instituto?
        </p>
        {clicked ? (
          <ClipLoader color="#fff" loading={clicked} size={50} />
        ) : (
          <div className="flex justify-center gap-4">
            <button
              className="bg-green-500 p-4 rounded-lg w-[50%] text-white text-3xl hover:bg-green-300 duration-150"
              onClick={handleCancelClick}
            >
              Cancelar
            </button>
            <button
              className="bg-red-500 p-4 rounded-lg w-[50%] text-white text-3xl hover:bg-red-300 duration-150"
              onClick={handleDeleteClick}
            >
              Deletar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

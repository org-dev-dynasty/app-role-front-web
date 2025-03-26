/* eslint-disable @typescript-eslint/no-unused-vars */
import { InstituteListContainer } from '@/containers/admin/InstituteListContainer';
import * as authActions from '@/context/auth/actions';
import {
  Sidebar,
  SidebarContent, SidebarInset, SidebarProvider
} from '@/components/ui/sidebar';

import { useAuthDispatch } from '@/hooks/useAuthDispatch';
import { EventListContainer } from '@/containers/admin/EventListContainer';

export const AdminPage = () => {
  // const {
  //   searchEvents: { data: searchEvents },
  // } = useEvent();

  // const eventDispatch = useEventDispatch();
  // const instituteDispatch = useInstituteDispatch();

  // const fetchInstitute = async () => {
  //   const instId = localStorage.getItem('instituteId');
  //   if (instId) {
  //     await instituteDispatch(
  //       getInstitute({
  //         instituteId: instId,
  //       })
  //     );
  //   }
  // };


  // const fetchEvents = async () => {
  //   const instituteID = localStorage.getItem('instituteId');
  //   if (instituteID) {
  //     await eventDispatch(
  //       getAllEventsByFilter({
  //         page: 1,
  //         search: {
  //           instituteId: instituteID,
  //         },
  //       })
  //     );
  //   }
  // };

  // const instName = localStorage.getItem('instituteName');

  // useEffect(() => {
  //   fetchEvents();
  //   fetchInstitute();
  // }, []);

  const authDispatch = useAuthDispatch();

  const handleSignOut = () => {
    authDispatch(authActions.signOut());
  };


  // const handleEditEvent = (event: Event) => {
  //   setEditingEvent(event);
  //   setOpenEventSheet(true);
  //   setTimeout(() => {
  //     setOpenEventVisible(true);
  //   }, 500);
  // };

  // const [openEventSheet, setOpenEventSheet] = useState(false);
  // const [openEventVisible, setOpenEventVisible] = useState(false);
  // const [editingEvent, setEditingEvent] = useState<Event>();

  return (
    <div className='w-full h-screen bg-[#1c1c1c] overflow-hidden'>
      <div className='flex justify-end p-4'>
        <button
          className='text-white bg-primary rounded-md px-4 py-2'
          onClick={handleSignOut}
        >
          Sair
        </button>
      </div>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <InstituteListContainer />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <EventListContainer />
        </SidebarInset>
        {/* <div className='h-full w-full bg-transparent items-center flex flex-col flex-grow'>
          <div className='flex justify-between w-full p-4'>
            <h1 className='font-thin text-3xl'>{instName}</h1>
            <button
              className='text-black bg-primary rounded-md px-4 py-2'
              onClick={() => setOpenEventSheet(true)}
            >
              Adicionar Evento
            </button>
          </div> */}

          {/* {searchEvents.length === 0 &&
            (<div className="flex items-center h-24 justify-evenly px-10 gap-10">
              <div className="w-5 h-5 rounded-full bg-gray-100 animate-loader-dot delay-100"></div>
              <div className="w-5 h-5 rounded-full bg-gray-100 animate-loader-dot delay-300"></div>
              <div className="w-5 h-5 rounded-full bg-gray-100 animate-loader-dot delay-500"></div>
            </div>)
          } */}

          {/* event cards*/}
          {/* <div className='grid grid-cols-4 gap-4'>
            {searchEvents && searchEvents.map((event) => (
              <EventCard event={event} />
            ))}
          </div>
        </div> */}


          {/* {openEventSheet && (
          <div className={`fixed top-0 left-0 w-full h-full duration-300 transition-opacity ${openEventVisible ? "bg-black/50 opacity-100" : "opacity-0"} backdrop-blur-sm z-50`} onClick={() => setOpenEventSheet(false)}>
            <div className={`absolute top-0 left-full w-96 h-full bg-[#1c1c1c] border-l-5 border-white shadow-none transform transition-all ${openEventVisible ? "-translate-x-full" : "translate-x-0"} duration-300`}>
              <div className='w-full h-[100vh] pt-4 px-4 overflow-y-scroll' onClick={(e) => e.stopPropagation()}>
                <CreateEventForm
                  onSuccess={() => setOpenEventSheet(false)}
                />
              </div>
            </div>
          </div>
        )} */}

      </SidebarProvider>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';

import { CreateEventForm } from '@/components/forms/CreateEvent';
import { useEvent } from '@/hooks/useEvent';
import { useEventDispatch } from '@/hooks/useEventDispatch';
import { deleteEvent, getAllEventsByFilter } from '@/context/event/actions';
import { Event } from '@/api/services/eventService/types';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { classNames } from 'primereact/utils';
import { toast } from 'react-toastify';
import { truncateText } from '@/pages/admin';

interface EventListContainerProps {
  trigger: boolean;
}

export default function EventListContainer({ trigger }: EventListContainerProps) {
  const {
    searchEvents: { data: searchEvents },
  } = useEvent();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const eventDispatch = useEventDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [seeingEvent, setSeeingEvent] = useState<Event>();
  const [openEventSheet, setOpenEventSheet] = useState(false);

  const [internalTrigger, setInternalTrigger] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (trigger) {
      setInternalTrigger(true);
    }
  }, [trigger]);

  const fetchEvents = async () => {
    const instituteID = localStorage.getItem('instituteId');
    if (instituteID) {
      setIsLoading(true);
      try {
        await eventDispatch(
          getAllEventsByFilter({
            page: 1,
            search: {
              instituteId: instituteID,
            },
          })
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (internalTrigger) {
      fetchEvents();
      setInternalTrigger(false);
    }
  }, [internalTrigger]);

  const instName = localStorage.getItem('instituteName');

  const handleSeeEvent = (event: Event) => {
    setSeeingEvent(event);
    setOpenEventSheet(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    setIsDeleteLoading(true);
    await eventDispatch(deleteEvent(eventId));
    setIsDeleteLoading(false);
  };

  function handleSelectEvent(event: Event) {
    console.log('Selected event:', event);
  }

  return (
    <div
      className={classNames(
        'w-full h-full flex relative'
      )}
    >
      <div className={classNames('absolute duration-100 transition-transform shadow-none top-0 left-0 w-full h-16 transform pointer-events-none z-10',
      )}>

        <Sidebar className='z-50 pointer-events-auto shadow-none'>
          <SidebarContent className='shadow-none'>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <span title={instName ? instName : ""} className='text-sm font-semibold text-light-purple'>
                  {instName && ("Eventos de " + truncateText(instName, 19))}
                </span>
              </SidebarGroupLabel>
            </SidebarGroup>

            <SidebarGroupAction title='Adicionar evento'>
              <Sheet open={openEventSheet} onOpenChange={setOpenEventSheet}>
                {instName && (<SheetTrigger className='shadow-none bg-light-purple rounded-sm z-50' onClick={() => setSeeingEvent(undefined)}>
                  <Plus size={16} />
                </SheetTrigger>)}
                <SheetContent className='flex flex-col'>
                  <SheetHeader>
                    <SheetTitle title={seeingEvent?.name} >{seeingEvent ? `${truncateText(seeingEvent?.name, 31)}` : "Adicionar um novo evento"}</SheetTitle>
                    <SheetDescription>
                      {!seeingEvent && ("Preencha o formulário abaixo para adicionar um novo evento")}
                    </SheetDescription>
                  </SheetHeader>
                  <div className='w-full flex-grow pt-4 pr-4 overflow-y-auto'>
                    <CreateEventForm
                      Event={seeingEvent}
                      onSuccess={() => { setOpenEventSheet(false); setInternalTrigger(true); }}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </SidebarGroupAction>

            <SidebarGroupContent>
              <SidebarMenu className='w-full overflow-y-scroll pb-28'>
                {instName ? ((isLoading || isDeleteLoading) ? (
                  <div className="flex items-center h-24 justify-evenly px-10">
                    <div className="w-5 h-5 rounded-full bg-gray-100 animate-loader-dot delay-100"></div>
                    <div className="w-5 h-5 rounded-full bg-gray-100 animate-loader-dot delay-300"></div>
                    <div className="w-5 h-5 rounded-full bg-gray-100 animate-loader-dot delay-500"></div>
                  </div>
                ) : searchEvents?.length === 0 ? (
                  <div className="text-center py-4 text-gray-500">
                    Nenhum evento encontrado
                  </div>
                ) : (
                  searchEvents?.map((event, key) => (
                    <SidebarMenuItem key={key}>
                      <SidebarMenuButton onClick={() => handleSelectEvent(event)}>
                        <div className='w-6 h-6 rounded-full overflow-hidden'>
                          <img src={event.eventPhoto} alt={`Foto do evento ${event.name}`} />
                        </div>
                        <span title={event.name}>{truncateText(event.name, 22)}</span>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction>
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side='right' align='start'>
                          <DropdownMenuItem onClick={() => handleSeeEvent(event)}>
                            <span>Ver Evento</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteEvent(event.eventId)}
                          >
                            <span>Deletar Evento</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  )))) : (
                  <div className="text-center py-4 text-gray-500">
                    Selecione um instituto
                  </div>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarContent>
        </Sidebar>
      </div>
    </div>
  );
}
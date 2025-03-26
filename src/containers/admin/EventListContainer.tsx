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

interface EventListContainerProps {
  trigger: boolean;
}

export default function EventListContainer({ trigger }: EventListContainerProps) {
  const {
    searchEvents: { data: searchEvents },
  } = useEvent();

  const [isLoading, setIsLoading] = useState(true);

  const eventDispatch = useEventDispatch();

  const [editingEvent, setEditingEvent] = useState<Event>();


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
  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setOpenEventSheet(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    setInternalTrigger(true);
    await eventDispatch(deleteEvent(eventId));
    toast.success('Evento deletado com sucesso');
  };

  function handleSelectEvent(event: Event) {
    console.log(event);
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
                <span>
                  {instName && ("Eventos de " + truncateText(instName, 19) )}
                </span>
              </SidebarGroupLabel>
            </SidebarGroup>

            <SidebarGroupAction title='Adicionar evento'>
              <Sheet open={openEventSheet} onOpenChange={setOpenEventSheet}>
                <SheetTrigger className='shadow-none'>
                  <Plus size={16} />
                </SheetTrigger>
                <SheetContent className='flex flex-col'>
                  <SheetHeader>
                    <SheetTitle>Adicionar um novo evento</SheetTitle>
                    <SheetDescription>
                      Preencha o formulário abaixo para adicionar um novo evento
                    </SheetDescription>
                  </SheetHeader>
                  <div className='w-full flex-grow pt-4 pr-4 overflow-y-auto'>
                    <CreateEventForm
                      Event={editingEvent}
                      onSuccess={() => setOpenEventSheet(false)}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </SidebarGroupAction>

            <SidebarGroupContent>
              <SidebarMenu>
                {instName ? (isLoading ? (
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
                        <span>{event.name}</span>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction>
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side='right' align='start'>
                          <DropdownMenuItem onClick={() => handleEditEvent(event)}>
                            <span>Editar Evento</span>
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
};
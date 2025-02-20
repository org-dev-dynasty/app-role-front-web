import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MoreHorizontal, Plus } from 'lucide-react';

import mapsJSON from '@/utils/maps_styles.json';

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

import { envs } from '@/utils/envs';
import { CreateEventForm } from '@/components/forms/CreateEvent';
import { useEvent } from '@/hooks/useEvent';
import { useEventDispatch } from '@/hooks/useEventDispatch';
import { deleteEvent, getAllEventsByFilter } from '@/context/event/actions';
import { Event } from '@/api/services/eventService/types';
import { useInstituteDispatch } from '@/hooks/useInstituteDispatch';
import { getInstitute } from '@/context/institute/actions';
import { useInstitute } from '@/hooks/useInstitute';
import { ClipLoader } from 'react-spinners';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { classNames } from 'primereact/utils';

export const EventListContainer = () => {
  const {
    searchEvents: { data: searchEvents },
  } = useEvent();

  const {
    institutes: { selected: selectedInstitute },
  } = useInstitute();

  const eventDispatch = useEventDispatch();
  const instituteDispatch = useInstituteDispatch();

  const [editingEvent, setEditingEvent] = useState<Event>();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: envs.googleMapsUrl,
    libraries: ['places'],
  });

  const [openEventSheet, setOpenEventSheet] = useState(false);

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    mapRef.current.setClickableIcons(false);
    mapRef.current?.setZoom(12);
    mapRef.current?.setOptions(mapsJSON);
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: -23.5489,
    lng: -46.6388,
  };

  const fetchEvents = async () => {
    const instituteID = localStorage.getItem('instituteId');
    if (instituteID) {
      await eventDispatch(
        getAllEventsByFilter({
          page: 1,
          search: {
            instituteId: instituteID,
          },
        })
      );
    }
  };

  const fetchInstitute = async () => {
    const instId = localStorage.getItem('instituteId');
    if (instId) {
      await instituteDispatch(
        getInstitute({
          instituteId: instId,
        })
      );
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setOpenEventSheet(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    await eventDispatch(deleteEvent(eventId));
  };

  useEffect(() => {
    fetchEvents();
    fetchInstitute();
  }, []);

  function handleSelectEvent(event: Event) {
    console.log(event);
  }

  return (
    <div
      className={classNames(
        'w-full h-full flex relative'
      )}
    >
      <div className={classNames('absolute top-0 left-0 w-full h-16 shadow-md transform pointer-events-none z-10',
        selectedInstitute && '-translate-x-full'
      )}>

        <Sidebar className='z-50 pointer-events-auto'>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <span>Eventos de {selectedInstitute?.name}</span>
              </SidebarGroupLabel>
            </SidebarGroup>

            <SidebarGroupAction title='Adicionar evento'>
              <Sheet open={openEventSheet} onOpenChange={setOpenEventSheet}>
                <SheetTrigger>
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
                {searchEvents.map((event, key) => (
                  <SidebarMenuItem key={key}>
                    <SidebarMenuButton onClick={() => handleSelectEvent(event)}>
                      <div className='w-6 h-6 rounded-full overflow-hidden'>
                        <img src={event.eventPhoto} />
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
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarContent>
        </Sidebar>
      </div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          <Marker position={center} onClick={(e) => console.log(e)} />
        </GoogleMap>
      ) : (
        <div className='flex justify-center items-center w-full flex-grow'>
          <ClipLoader />
        </div>
      )}
    </div>
  );
};

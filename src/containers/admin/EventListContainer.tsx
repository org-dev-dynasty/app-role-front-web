import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Plus } from 'lucide-react';

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
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { envs } from '@/utils/envs';
import { CreateEventForm } from '@/components/forms/CreateEvent';
import { useEvent } from '@/hooks/useEvent';
import { useEventDispatch } from '@/hooks/useEventDispatch';
import { getAllEventsByFilter } from '@/context/event/actions';
import { Event } from '@/api/services/eventService/types';
import { useInstituteDispatch } from '@/hooks/useInstituteDispatch';
import { getInstitute } from '@/context/institute/actions';
import { useInstitute } from '@/hooks/useInstitute';

export const EventListContainer = () => {
  const {
    events: { data: allEvents },
  } = useEvent()

  const {
    institutes: { data: institute },
  } = useInstitute()

  const eventDispatch = useEventDispatch();
  const instituteDispatch = useInstituteDispatch();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: envs.googleMapsUrl,
  });

  const [openEventSheet, setOpenEventSheet] = useState(false);

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    mapRef.current.setClickableIcons(false);
    mapRef.current?.setZoom(12);
    mapRef.current?.setOptions({
      disableDefaultUI: true,
      styles: [
        {
          elementType: 'geometry',
          stylers: [
            {
              color: '#242f3e',
            },
          ],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#746855',
            },
          ],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#242f3e',
            },
          ],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#d59563',
            },
          ],
        },
        {
          featureType: 'poi',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#d59563',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#263c3f',
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#6b9a76',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            {
              color: '#38414e',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#212a37',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9ca5b3',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            {
              color: '#746855',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#1f2835',
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#f3d19c',
            },
          ],
        },
        {
          featureType: 'transit',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {
              color: '#2f3948',
            },
          ],
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#d59563',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#17263c',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#515c6d',
            },
          ],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#17263c',
            },
          ],
        },
      ],
    });
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
        getAllEventsByFilter(
          {
            page: 1,
            search: {
              instituteId: instituteID,
            }
          }
        )
      );
    }
  }

  const fetchInstitute = async () => {
    const instId = localStorage.getItem('instituteId');
    if (instId) {
      await instituteDispatch(
        getInstitute({
          instituteId: instId
        })
      );
    }
  }

  useEffect(() => {
    fetchEvents();
    fetchInstitute();
    console.log(institute);
    console.log(allEvents);
  }, []);

  function handleSelectEvent(event: Event) {
    console.log(event);
  }

  return (
    <div className='w-full h-full flex transform translate-x-[0px]'>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              {/* // NAo ta funcionando */}
              <span>Eventos de {institute[0].name}</span>
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
                  <CreateEventForm />
                </div>
              </SheetContent>
            </Sheet>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              {allEvents.map((event, key) => (
                <SidebarMenuItem key={key}>
                  <SidebarMenuButton
                    onClick={() => handleSelectEvent(event)}
                  >
                    <div className='w-6 h-6 rounded-full overflow-hidden'>
                      <img src={event.eventPhoto} />
                    </div>
                    <span>{event.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
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
          <>carregando</>
        )}
      </SidebarInset>
    </div>
  );
};

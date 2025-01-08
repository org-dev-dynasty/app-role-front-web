import React, { useState } from 'react';
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
  SidebarGroupLabel,
  SidebarInset,
} from '@/components/ui/sidebar';

import { envs } from '@/utils/envs';

export const EventListContainer = () => {
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

  return (
    <div className='w-full h-full flex transform translate-x-[0px]'>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <span>Eventos</span>
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
                  {/* <CreateInstituteForm institute={editingInstitute} /> */}
                </div>
              </SheetContent>
            </Sheet>
          </SidebarGroupAction>
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

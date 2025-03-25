/* eslint-disable @typescript-eslint/no-unused-vars */
import { InstituteListContainer } from '@/containers/admin/InstituteListContainer';
import * as authActions from '@/context/auth/actions';
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';

import { EventListContainer } from '@/containers/admin/EventListContainer';
import { useAuthDispatch } from '@/hooks/useAuthDispatch';
import { getAllEventsByFilter } from '@/context/event/actions';
import { useEventDispatch } from '@/hooks/useEventDispatch';
import { useEffect } from 'react';
import { useEvent } from '@/hooks/useEvent';
import EventCard from '@/components/EventCard';
import { useInstituteDispatch } from '@/hooks/useInstituteDispatch';
import { getInstitute } from '@/context/institute/actions';

export const AdminPage = () => {
  const {
    searchEvents: { data: searchEvents },
  } = useEvent();
  const eventDispatch = useEventDispatch();
  const instituteDispatch = useInstituteDispatch();

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

  const instName = localStorage.getItem('instituteName');

  useEffect(() => {
    fetchEvents();
    fetchInstitute();
  }, []);

  const authDispatch = useAuthDispatch();

  const handleSignOut = () => {
    authDispatch(authActions.signOut());
  };

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
        {/* <SidebarInset>
          <EventListContainer />
        </SidebarInset> */}
        <div className='h-full w-full bg-transparent items-center flex flex-col flex-grow'>
          <h1 className='font-thin text-3xl'>{instName}</h1>

          {searchEvents.length === 0 &&
            (<div className="flex items-center h-24 justify-evenly px-10 gap-10">
              <div className="w-5 h-5 rounded-full bg-gray-100 animate-loader-dot delay-100"></div>
              <div className="w-5 h-5 rounded-full bg-gray-100 animate-loader-dot delay-300"></div>
              <div className="w-5 h-5 rounded-full bg-gray-100 animate-loader-dot delay-500"></div>
            </div>)
          }

          {/* event cards*/}
          {searchEvents && searchEvents.map((event) => (
            <EventCard name={event.name} imageUrl={event.eventPhoto} />
          ))}
        </div>

      </SidebarProvider>
    </div>
  );
};

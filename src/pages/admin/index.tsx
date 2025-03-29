/* eslint-disable @typescript-eslint/no-unused-vars */
import * as authActions from '@/context/auth/actions';
import {
  Sidebar,
  SidebarContent, SidebarInset, SidebarProvider
} from '@/components/ui/sidebar';

import { useAuthDispatch } from '@/hooks/useAuthDispatch';
import EventListContainer from '@/containers/admin/EventListContainer';
import React from 'react';
import InstituteListContainer from '@/containers/admin/InstituteListContainer';
import { LogOut } from 'lucide-react';
import { IMAGES } from '@/constants/image';

export const AdminPage = () => {

  const authDispatch = useAuthDispatch();

  const handleSignOut = () => {
    localStorage.removeItem('instituteId');
    localStorage.removeItem('instituteName');
    authDispatch(authActions.signOut());
  };

  const [trigger, setTrigger] = React.useState(false);
  function handleTrigger(value: boolean) {
    setTrigger(value);
    console.log('trigger', value);
  }

  return (
    <div className='w-full h-screen bg-[#1c1c1c] overflow-hidden'>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <InstituteListContainer setTrigger={handleTrigger} />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className='flex justify-between p-4'>
            <div className='flex justify-center h-10'>
              <img
                src={IMAGES.logo}
                alt='AppRole Logo'
                className='w-full h-full object-contain'
              />
            </div>
            <h1 className='text-white text-xl font-chillax'>
              {localStorage.getItem('instituteName')}
            </h1>
            <button
              className='text-secondary bg-primary rounded-md px-4 py-2'
              onClick={handleSignOut}
            >
              <LogOut />
            </button>
          </div>
          <EventListContainer trigger={trigger} />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

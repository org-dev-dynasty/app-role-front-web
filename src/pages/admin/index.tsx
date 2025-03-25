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

export const AdminPage = () => {
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
        
      </SidebarProvider>
    </div>
  );
};

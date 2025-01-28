import { InstituteListContainer } from '@/containers/admin/InstituteListContainer';

import * as authActions from '@/context/auth/actions';

import { useAuthDispatch } from '@/hooks/useAuthDispatch';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { EventListContainer } from '@/containers/admin/EventListContainer';

export const AdminPage = () => {
  const authDispatch = useAuthDispatch();

  const handleSignOut = () => {
    authDispatch(authActions.signOut());
  };

  const instituteID = localStorage.getItem('instituteID');

  return (
    <div className='w-full h-screen bg-background'>
      <Button onClick={handleSignOut}>logout</Button>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <InstituteListContainer />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <Button onClick={handleSignOut}>logout</Button>
          {/* <EventListContainer /> */}
          {instituteID && <EventListContainer />}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

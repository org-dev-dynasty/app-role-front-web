import { InstituteListContainer } from '@/containers/admin/InstituteListContainer';

import * as authActions from '@/context/auth/actions';

import { useAuthDispatch } from '@/hooks/useAuthDispatch';

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

  return (
    <div className='w-full h-screen bg-background'>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <InstituteListContainer />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <EventListContainer />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

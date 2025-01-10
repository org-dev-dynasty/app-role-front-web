// import {
//   Sidebar,
//   SidebarContent,
//   SidebarInset,
//   SidebarProvider,
// } from '@/components/ui/sidebar';
// import { EventListContainer } from '@/containers/admin/EventListContainer';
// import { InstituteListContainer } from '@/containers/admin/InstituteListContainer';
import { Button } from '@/components/ui/button';
import * as authActions from '@/context/auth/actions';
import { useAuthDispatch } from '@/hooks/useAuthDispatch';

export const AdminPage = () => {
  const authDispatch = useAuthDispatch();

  const handleSignOut = () => {
    authDispatch(authActions.signOut());
  };

  return (
    <div className='w-full h-screen bg-background'>
      <Button onClick={handleSignOut}>logout</Button>
      {/* <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <InstituteListContainer />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <EventListContainer />
        </SidebarInset>
      </SidebarProvider> */}
    </div>
  );
};

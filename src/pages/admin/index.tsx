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
import { useEffect, useState } from 'react';

export const AdminPage = () => {
  const authDispatch = useAuthDispatch();
  const [clicked, setClicked] = useState<boolean>(false);
  
  const handleSignOut = () => {
    authDispatch(authActions.signOut());
  };

  const toggleTrueClicked = () => {
    setClicked(true);
  }
  const toggleFalseClicked = () => {
    setClicked(false);
  }
  
  useEffect(() => {
    const instituteID = localStorage.getItem('instituteID');
    console.log(instituteID);
  }
  , [clicked]);

  return (
    <div className='w-full h-screen bg-background'>
      <Button onClick={handleSignOut}>logout</Button>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <InstituteListContainer toggleTrue={toggleTrueClicked} toggleFalse={toggleFalseClicked} />
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <Button onClick={handleSignOut}>logout</Button>
          {/* <EventListContainer /> */}
          {clicked && <EventListContainer />}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

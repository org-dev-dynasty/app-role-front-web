/* eslint-disable @typescript-eslint/no-unused-vars */
import { InstituteListContainer } from '@/containers/admin/InstituteListContainer';



import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';

import { EventListContainer } from '@/containers/admin/EventListContainer';

export const AdminPage = () => {

  

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

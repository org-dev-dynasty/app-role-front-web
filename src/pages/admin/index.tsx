import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { EventListContainer } from '@/containers/admin/EventListContainer';
import { InstituteListContainer } from '@/containers/admin/InstituteListContainer';
import { InstituteApiContextProvider } from '@/context/instituteApi';

export const AdminPage = () => {
  return (
    <InstituteApiContextProvider>
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
    </InstituteApiContextProvider>
  );
};

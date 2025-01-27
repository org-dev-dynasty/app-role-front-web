import { MoreHorizontal, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getAllInstitutes } from '@/context/institute/actions';

import { useInstitute } from '@/hooks/useInstitute';
import { useInstituteDispatch } from '@/hooks/useInstituteDispatch';

import { Institute } from '@/api/services/instituteService/types';

import { CreateInstituteForm } from '@/components/forms/CreateInstitute';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export const InstituteListContainer = () => {
  const {
    institutes: { data: allInstitutes },
  } = useInstitute();

  const instituteApiDispatch = useInstituteDispatch();

  const [openInstituteSheet, setOpenInstituteSheet] = useState<boolean>(false);
  const [editingInstitute, setEditingInstitute] = useState<Institute>();

  const handleSelectInstitute = (institute: Institute) => {
    console.log(institute);
  };

  const handleEditInstitute = (institute: Institute) => {
    setEditingInstitute(institute);
    setOpenInstituteSheet(true);
  };

  const handleOpenChange = (currentOpenState: boolean) => {
    setOpenInstituteSheet(currentOpenState);

    if (currentOpenState) return;

    setEditingInstitute(undefined);
  };

  const fetchInstitutes = async () => {
    await instituteApiDispatch(
      getAllInstitutes({
        page: 1,
      })
    );
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupLabel asChild>
        <span>Institutos</span>
      </SidebarGroupLabel>

      <SidebarGroupAction title='Adicionar Institutos'>
        <Sheet open={openInstituteSheet} onOpenChange={handleOpenChange}>
          <SheetTrigger>
            <Plus size={16} />
          </SheetTrigger>
          <SheetContent className='flex flex-col'>
            <SheetHeader>
              <SheetTitle>Adicionar um novo instituto</SheetTitle>
              <SheetDescription>
                Preencha o formulário abaixo para adicionar um novo instituto
              </SheetDescription>
            </SheetHeader>
            <div className='w-full flex-grow pt-4 pr-4 overflow-y-auto'>
              <CreateInstituteForm institute={editingInstitute} />
            </div>
          </SheetContent>
        </Sheet>
      </SidebarGroupAction>

      <SidebarGroupContent>
        <SidebarMenu>
          {allInstitutes.map((institute, key) => (
            <SidebarMenuItem key={key}>
              <SidebarMenuButton
                onClick={() => handleSelectInstitute(institute)}
              >
                <div className='w-6 h-6 rounded-full overflow-hidden'>
                  <img src={institute.logo} />
                </div>
                <span>{institute.name}</span>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='right' align='start'>
                  <DropdownMenuItem
                    onClick={() => {
                      handleEditInstitute(institute);
                    }}
                  >
                    <span>Editar Instituto</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Deletar Instituto</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

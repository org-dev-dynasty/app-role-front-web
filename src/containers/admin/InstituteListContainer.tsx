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
import { getAllInstitutes } from '@/context/instituteApi/actions';
import { Institute } from '@/context/instituteApi/types';
import { useInstituteApiDispatch } from '@/hooks/useInsituteApiDispatch';
import { useInstituteApi } from '@/hooks/useInstituteApi';
import { MoreHorizontal, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export const InstituteListContainer = () => {
  const { allInstitutes } = useInstituteApi();
  const instituteApiDispatch = useInstituteApiDispatch();

  const [openInstituteSheet, setOpenInstituteSheet] = useState<boolean>(false);
  const [editingInstitute, setEditingInstitute] = useState<Institute>();

  const handleSelectInstitute = (institute: Institute) => {
    console.log(institute);
    // instituteApiDispatch()
  };

  const handleEditInstitute = (institute: Institute) => {
    setEditingInstitute(institute);
    setOpenInstituteSheet(true);
  };

  // const handleDeleteInstitute = (institute: Institute) => {};

  const handleOpenChange = (currentOpenState: boolean) => {
    setOpenInstituteSheet(currentOpenState);

    if (currentOpenState) return;

    setEditingInstitute(undefined);
  };

  useEffect(() => {
    instituteApiDispatch(getAllInstitutes());
  }, []);

  const todos = !allInstitutes.data.length
    ? []
    : new Array(123).fill(allInstitutes.data[0]);

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
          {todos.map((institute, key) => (
            <SidebarMenuItem key={key}>
              <SidebarMenuButton
                onClick={() => handleSelectInstitute(institute)}
              >
                <div className='w-6 h-6 rounded-full overflow-hidden'>
                  <img src={institute.logoPhoto} />
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

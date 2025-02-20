import { MoreHorizontal, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  clearSelectedInstitute,
  createInstitute,
  deleteInstitute,
  getAllInstitutes,
  getInstitute,
  updateInstitute,
} from '@/context/institute/actions';

import { useInstitute } from '@/hooks/useInstitute';
import { useInstituteDispatch } from '@/hooks/useInstituteDispatch';

import {
  CreateInstituteParams,
  Institute,
  UpdateInstituteParams,
} from '@/api/services/instituteService/types';

import {
  CreateInstituteForm,
  CreateInstituteFormData,
} from '@/components/forms/CreateInstitute';
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
import { useEventDispatch } from '@/hooks/useEventDispatch';
import { getAllEventsByFilter } from '@/context/event/actions';
import { InstitutePartner } from '@/constants/institutePartner';
import { InstituteType } from '@/constants/instituteType';
import { Region } from '@/constants/regions';

export const InstituteListContainer = () => {
  const {
    institutes: { data: allInstitutes, selected: selectedInstitute },
  } = useInstitute();

  const instituteApiDispatch = useInstituteDispatch();
  const eventDispatch = useEventDispatch();

  const [openInstituteSheet, setOpenInstituteSheet] = useState<boolean>(false);
  const [editingInstitute, setEditingInstitute] = useState<Institute>();

  const handleSelectInstitute = async (institute: Institute) => {
    if (institute.instituteId === selectedInstitute?.instituteId) {
      instituteApiDispatch(
        clearSelectedInstitute()
      );
      return
    }    
    
    const response = await instituteApiDispatch(
      getInstitute({ instituteId: institute.instituteId })
    );

    if (!response.success) {
      return;
    }

    eventDispatch(
      getAllEventsByFilter({
        search: { instituteId: institute.instituteId },
        page: 1,
      })
    );
  };

  const handleDeleteInstitute = (institute: Institute) => {
    instituteApiDispatch(
      deleteInstitute({
        instituteId: institute.instituteId,
      })
    );
  }

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

  const onCreateInstitute = async (values: CreateInstituteFormData) => {
    console.log('create');

    if (editingInstitute) {
      const updateInstituteData: UpdateInstituteParams = {
        instituteId: editingInstitute.instituteId,
        name: values.instituteName,
        description: values.instituteDescription,
        partnerType: values.partnerType as InstitutePartner,
        instituteType: values.instituteType as InstituteType,
        phone: values.phone,
        district: values.district as Region,
        address: {
          address: values.address,
          number: Number(values.location.number),
          neighborhood: values.location.neighborhood,
          city: values.location.city,
          state: values.location.state,
          cep: values.location.cep,
          latitude: Number(values.location.latitude),
          longitude: Number(values.location.longitude),
        },
        logo: values.logoPhoto,
        price: values.price,
      };
      await instituteApiDispatch(updateInstitute(updateInstituteData));
    } else {
      const instituteData: CreateInstituteParams = {
        name: values.instituteName,
        description: values.instituteDescription,
        partnerType: values.partnerType as InstitutePartner,
        instituteType: values.instituteType as InstituteType,
        phone: values.phone,
        district: values.district as Region,
        address: {
          address: values.address,
          number: Number(values.location.number),
          neighborhood: values.location.neighborhood,
          city: values.location.city,
          state: values.location.state,
          cep: values.location.cep,
          latitude: Number(values.location.latitude),
          longitude: Number(values.location.longitude),
        },
        logo: values.logoPhoto,
        price: values.price,
      };
      await instituteApiDispatch(createInstitute(instituteData));
    }

    setOpenInstituteSheet(false);
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
              <CreateInstituteForm
                institute={editingInstitute}
                onSuccess={onCreateInstitute}
              />
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
                <span className='text-foreground'>{institute.name}</span>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild title='Mais ações'>
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
                  <DropdownMenuItem onClick={() => {
                    handleDeleteInstitute(institute);
                  }}>
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

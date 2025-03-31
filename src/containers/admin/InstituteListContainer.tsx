
import { Loader2, MoreHorizontal, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  clearSelectedInstitute,
  createInstitute,
  deleteInstitute,
  getAllInstitutes,
  getInstitute
} from '@/context/institute/actions';

import { useInstitute } from '@/hooks/useInstitute';
import { useInstituteDispatch } from '@/hooks/useInstituteDispatch';

import {
  CreateInstituteParams,
  Institute
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
import { truncateText } from '@/pages/admin';

interface InstituteListContainerProps {
  setTrigger: (value: boolean) => void;
}

export default function InstituteListContainer({ setTrigger }: InstituteListContainerProps) {
  const {
    institutes: { data: allInstitutes, selected: selectedInstitute },
  } = useInstitute();

  const instituteApiDispatch = useInstituteDispatch();
  const eventDispatch = useEventDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [localActionLoading, setLocalActionLoading] = useState<boolean>(false)

  const [openInstituteSheet, setOpenInstituteSheet] = useState<boolean>(false);
  const [editingInstitute, setEditingInstitute] = useState<Institute>();

  const handleSelectInstitute = async (institute: Institute) => {

    if (institute.instituteId === selectedInstitute?.instituteId) {
      instituteApiDispatch(clearSelectedInstitute());
      localStorage.removeItem('instituteId');
      localStorage.removeItem('instituteName');
      setTrigger(false); // Resetar o trigger
      return;
    }
    try {
      setTrigger(false);
      setTimeout(() => setTrigger(true), 100);

      const response = await instituteApiDispatch(
        getInstitute({ instituteId: institute.instituteId })
      );
      localStorage.setItem('instituteName', institute.name);

      if (!response.success) return;

      await eventDispatch(
        getAllEventsByFilter({
          search: { instituteId: institute.instituteId },
          page: 1,
        })
      );
    } finally {
      setLocalActionLoading(false);
    }
  };

  const handleDeleteInstitute = async (institute: Institute) => {
    setLocalActionLoading(true);
    await instituteApiDispatch(
      deleteInstitute({
        instituteId: institute.instituteId,
      })
    );
    setLocalActionLoading(false);
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
    setIsLoading(true);
    try {
      await instituteApiDispatch(
        getAllInstitutes({
          page: 1,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onCreateInstitute = async (values: CreateInstituteFormData) => {
    setLocalActionLoading(true);
    try {
      console.log('create');

      if (editingInstitute) {
        // const updateInstituteData: UpdateInstituteParams = {
        //   instituteId: editingInstitute.instituteId,
        //   name: values.instituteName,
        //   description: values.instituteDescription,
        //   partnerType: values.partnerType as InstitutePartner,
        //   instituteType: values.instituteType as InstituteType,
        //   phone: values.phone,
        //   district: values.district as Region,
        //   address: {
        //     address: values.address,
        //     number: Number(values.location.number),
        //     neighborhood: values.location.neighborhood,
        //     city: values.location.city,
        //     state: values.location.state,
        //     cep: values.location.cep,
        //     latitude: Number(values.location.latitude),
        //     longitude: Number(values.location.longitude),
        //   },
        //   logo: values.logoPhoto,
        //   price: values.price,
        // };
        // await instituteApiDispatch(updateInstitute(updateInstituteData));
      } else {
        const instituteData: CreateInstituteParams = {
          name: values.instituteName,
          description: values.instituteDescription,
          partnerType: values.partnerType as InstitutePartner,
          instituteType: values.instituteType as InstituteType,
          phone: values.phone,
          district: values.district as Region,
          address: {
            address: values.location.address,
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
    } finally {
      setLocalActionLoading(false);
      setOpenInstituteSheet(false);
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const showLoading = isLoading || localActionLoading;

  return (
    <SidebarGroup>
      <SidebarGroupLabel asChild>
        <span>Institutos</span>
      </SidebarGroupLabel>

      <SidebarGroupAction title='Adicionar Institutos'>
        <Sheet open={openInstituteSheet} onOpenChange={handleOpenChange}>
          <SheetTrigger disabled={showLoading} className='shadow-none bg-light-purple rounded-sm z-50'>
            {showLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus size={16} />
            )}
          </SheetTrigger>
          <SheetContent className='flex flex-col'>
            <SheetHeader>
              <SheetTitle>{editingInstitute ? `${editingInstitute.name}` : "Adicionar um novo Insituto"}</SheetTitle>
              <SheetDescription>
                {!editingInstitute && ("Preencha o formulário abaixo para adicionar um novo instituto")}
              </SheetDescription>
            </SheetHeader>
            <div className='w-full flex-grow pt-4 pr-4 overflow-y-auto'>
              {localActionLoading ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <CreateInstituteForm
                  institute={editingInstitute}
                  onSuccess={onCreateInstitute}
                />
              )}
            </div>
          </SheetContent>
        </Sheet>
      </SidebarGroupAction>

      <SidebarGroupContent>
        {showLoading ? (
          <div className='flex items-center h-24 justify-evenly px-10 gap-10'>
            <div className='w-5 h-5 rounded-full bg-gray-100 animate-loader-dot delay-100'></div>
            <div className='w-5 h-5 rounded-full bg-gray-100 animate-loader-dot delay-300'></div>
            <div className='w-5 h-5 rounded-full bg-gray-100 animate-loader-dot delay-500'></div>
          </div>
        ) : (
          <SidebarMenu>
            {Array.isArray(allInstitutes) && allInstitutes.map((institute) => (
              <SidebarMenuItem key={institute.instituteId}>
                <SidebarMenuButton
                  onClick={() => handleSelectInstitute(institute)}
                  disabled={localActionLoading}
                  title={institute.name}
                >
                  <div className='w-6 h-6 rounded-full overflow-hidden'>
                    <img src={institute.logo} alt={institute.name} />
                  </div>
                  <span className='text-foreground'>{truncateText(institute.name, 24)}</span>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild title='Mais ações' disabled={localActionLoading}>
                    <SidebarMenuAction>
                      {localActionLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MoreHorizontal />
                      )}
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side='right' align='start'>
                    <DropdownMenuItem
                      onClick={() => handleEditInstitute(institute)}
                      disabled={localActionLoading}
                    >
                      {localActionLoading ? 'Processando...' : 'Ver Instituto'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteInstitute(institute)}
                      disabled={localActionLoading}
                    >
                      {localActionLoading ? 'Processando...' : 'Deletar Instituto'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Institute } from '@/api/services/instituteService/types';

import {
  INSTITUTE_PARTNER,
  institutePartnerFields,
} from '@/constants/institutePartner';
import { INSTITUTE_TYPE, instituteTypeFields } from '@/constants/instituteType';
import { priceFields } from '@/constants/price';
import { regionFields, REGIONS } from '@/constants/regions';

import { addressValidation } from '@/utils/validations';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import AddressInput from '@/components/input/Address';
import ImageInput from '@/components/input/Image';
import PhoneInput from '@/components/input/Phone';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  instituteName: z.string(),
  instituteDescription: z.string(),
  partnerType: z.string(),
  instituteType: z.string(),
  phone: z.string(),
  address: z.string(),
  logoPhoto: z.instanceof(File),
  location: addressValidation,
  price: z.number(),
  district: z.string(),
});

export type CreateInstituteFormData = z.infer<typeof formSchema>;

interface SinInFormProps {
  onSuccess?: (data: CreateInstituteFormData) => void;
  institute?: Institute;
}

const createDefaultValues = (institute?: Institute) => {
  if (!institute) {
    return {
      instituteName: 'Instituto Legal',
      instituteDescription: 'Descrição legal do instituto',
      partnerType: INSTITUTE_PARTNER.GLOBAL_PARTNER,
      instituteType: INSTITUTE_TYPE.ESTABELECIMENTO_FIXO,
      phone: '11999999999',
      address: 'Rua Fiação da Saúde, 361',
      price: 3,
      district: REGIONS.ZONA_SUL,
      location: {
        cep: '04144020',
        address: 'Rua Fiação da Saúde',
        number: '361',
        neighborhood: 'Vila da Saúde',
        city: 'São Paulo',
        state: 'SP',
        latitude: '-23.61757',
        longitude: '-46.63765',
      },
    };
  }

  return {
    instituteName: institute ? institute.name : '',
    instituteDescription: institute ? institute.description : '',
    partnerType: institute ? institute.partnerType : '',
    instituteType: institute ? institute.instituteType : '',
    phone: institute ? institute.phone : '',
    address: institute ? institute.address.address : '',
    price: institute?.price,
    district: institute ? institute.district : '',
    location: {
      cep: '',
      address: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      latitude: '',
      longitude: '',
    },
  };
};

export function CreateInstituteForm({ onSuccess, institute }: SinInFormProps) {
  const form = useForm<CreateInstituteFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: createDefaultValues(institute),
    mode: 'onSubmit',
  });

  function onSubmit(values: CreateInstituteFormData) {
    onSuccess?.(values);
  }

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 pl-[1px] relative'
      >
        <h2 className={`text-xl font-bold text-foreground`}>
          Informações de exibição
        </h2>

        <FormField
          control={form.control}
          name='instituteName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do instituto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='instituteDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do instituto</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Crie uma descrição para o instituto'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='logoPhoto'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <ImageInput
                  onChange={(files: any) => {
                    field.onChange(files?.[0] ?? undefined);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <h2 className='text-xl font-bold'>Contato e localização</h2>

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <PhoneInput placeholder='(99) 99999-9999' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buscar endereço</FormLabel>
              <FormControl>
                <AddressInput onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  value={value.cep}
                  onChange={(e) => onChange({ ...value, cep: e.target.value })}
                  {...props}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input
                  value={value.address}
                  onChange={(e) =>
                    onChange({ ...value, address: e.target.value })
                  }
                  {...props}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input
                  value={value.number}
                  onChange={(e) =>
                    onChange({ ...value, number: e.target.value })
                  }
                  {...props}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input
                  value={value.neighborhood}
                  onChange={(e) =>
                    onChange({ ...value, neighborhood: e.target.value })
                  }
                  {...props}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input
                  value={value.city}
                  onChange={(e) => onChange({ ...value, city: e.target.value })}
                  {...props}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input
                  value={value.state}
                  onChange={(e) =>
                    onChange({ ...value, state: e.target.value })
                  }
                  {...props}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='district'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Região</FormLabel>
              <Select
                value={field.value.toString()}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um valor' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regionFields.map(({ value, label }) => (
                    <SelectItem value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input
                  disabled
                  value={value.latitude}
                  onChange={(e) =>
                    onChange({ ...value, latitude: e.target.value })
                  }
                  {...props}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='location'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input
                  disabled
                  value={value.longitude}
                  onChange={(e) =>
                    onChange({ ...value, longitude: e.target.value })
                  }
                  {...props}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />
        <h2 className='text-xl font-bold'>Informações adicionais</h2>

        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <Select
                value={field.value.toString()}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um valor' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {priceFields.map(({ value, label }) => (
                    <SelectItem value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='instituteType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de instituto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um valor' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {instituteTypeFields.map(({ value, label }) => (
                    <SelectItem value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='partnerType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de parceiro</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um valor' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {institutePartnerFields.map(({ value, label }) => (
                    <SelectItem value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          {institute ? 'Atualizar Instituto' : 'Criar Instituto'}
        </Button>
      </form>
    </Form>
  );
}

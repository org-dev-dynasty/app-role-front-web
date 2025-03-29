/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Institute } from '@/api/services/instituteService/types';

import {
  institutePartnerFields
} from '@/constants/institutePartner';
import { instituteTypeFields } from '@/constants/instituteType';
import { priceFields } from '@/constants/price';
import { regionFields } from '@/constants/regions';

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

  console.log(institute);

  return {
    instituteName: institute ? institute.name : '',
    instituteDescription: institute ? institute.description : '',
    partnerType: institute ? institute.partnerType : '',
    instituteType: institute ? institute.instituteType : '',
    phone: institute ? institute.phone : '',
    price: Number(institute?.price) || undefined,
    location: {
      district: institute ? institute.address.district : '',
      cep: institute ? institute.address.cep : '',
      street: institute ? institute.address.address : '',
      address: institute ? (institute.address.street || institute.address.address) : '',
      number: institute ? String(institute.address.number) : '',
      neighborhood: institute ? institute.address.neighborhood : '',
      city: institute ? institute.address.city : '',
      state: institute ? institute.address.state : '',
      latitude: institute ? String(institute.address.latitude) : '',
      longitude: institute ? String(institute.address.longitude) : '',
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
                <Input {...field} disabled={institute ? true : false} />
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
                  {...field}
                  disabled={institute ? true : false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {institute ? (
          <div>
            <FormLabel>Logo</FormLabel>
            <img src={institute.logo} alt="" />
          </div>
        )
          : < FormField
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
          />}
        <Separator />
        <h2 className='text-xl font-bold'>Contato e localização</h2>

        {!institute &&
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <PhoneInput placeholder='(99) 99999-9999' {...field} disabled={institute ? true : false} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />}

        {!institute && (<FormField
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
        />)}

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
                  disabled={institute ? true : false}
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
                  disabled={institute ? true : false}
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
                  disabled={institute ? true : false}
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
                  disabled={institute ? true : false}
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
                  disabled={institute ? true : false}
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
                  disabled={institute ? true : false}
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
              <FormLabel>Zona do Instituto</FormLabel>
              {institute ? (
                <Select disabled onValueChange={field.onChange} defaultValue={field.value}>
                  <div className='p-2 border-[1px] border-[#1c1c1c] text-[#999] rounded-lg'> {institute.address.district?.replace(/_/g, ' ')} </div>
                </Select>
              ) : (<Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um valor' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regionFields.map((regionField) => (
                    <SelectItem key={regionField.value} value={regionField.value}>
                      {regionField.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>)}
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
                defaultValue={String(field.value)}
                onValueChange={(value) => field.onChange(Number(value))}
                disabled={institute ? true : false}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}
                disabled={institute ? true : false}>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}
                disabled={institute ? true : false}>
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
        {!institute && (<Button type='submit' className='w-full'>
          'Criar Instituto'
        </Button>)}
      </form>
    </Form>
  );
}

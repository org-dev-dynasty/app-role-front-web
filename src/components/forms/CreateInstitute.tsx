import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PhoneInput from '@/components/input/Phone';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import ImageInput from '../input/Image';
import { Institute } from '@/context/institute/types';
import { addressValidation } from '@/utils/validations';
import AddressInput from '../input/Address';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  instituteName: z.string(),
  instituteDescription: z.string(),
  partnerType: z.string(),
  instituteType: z.string(),
  phone: z.string(),
  address: z.string(),
  logoPhoto: z.string(),
  location: addressValidation,
});

type FormData = z.infer<typeof formSchema>;

interface SinInFormProps {
  onSuccess?: () => void;
  institute?: Institute;
}

export function CreateInstituteForm({ onSuccess, institute }: SinInFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instituteName: institute ? institute.name : '',
      instituteDescription: institute ? institute.description : '',
      partnerType: institute ? institute.partnerType : '',
      instituteType: institute ? institute.instituteType : '',
      phone: institute ? institute.phone : '',
      address: institute ? institute.address : '',
      logoPhoto: institute ? institute.logoPhoto : '',
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
    },
    mode: 'onSubmit',
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('Submitting form');
    console.log('Values:', values);
    onSuccess?.();
  }



  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 pl-[1px] relative'
      >
        <h2 className='text-xl font-bold'>Informações de exibição</h2>

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
                <ImageInput {...field} />
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
                  <SelectItem value='ESTABELECIMENTO_FIXO'>Estabelecimento fixo</SelectItem>
                  <SelectItem value='AGENCIA_DE_FESTAS'>Agência de festas</SelectItem>
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
                  <SelectItem value='GLOBAL_PARTNER'>Parceiro global</SelectItem>
                  <SelectItem value='PROMOTER_PARTNER'>Promotor</SelectItem>
                  <SelectItem value='NO_PARTNER'>Não parceiro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Criar Instituto
        </Button>
      </form>
    </Form>
  );
}

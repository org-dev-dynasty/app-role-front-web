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
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import ImageInput from '../input/Image';
import { Event } from '@/context/Event/types';
import { addressValidation } from '@/utils/validations';
import AddressInput from '../input/Address';
import { Separator } from '../ui/separator';

const formSchema = z.object({
  EventName: z.string(),
  EventDescription: z.string(),
  partnerType: z.string(),
  EventType: z.string(),
  phone: z.string(),
  address: z.string(),
  banner: z.string(),
  price: z.string(),
  musicType: z.array(z.string()),
  features: z.array(z.string()),
  location: addressValidation,
});

type FormData = z.infer<typeof formSchema>;

interface SinInFormProps {
  onSuccess?: () => void;
  Event?: Event;
}

export function CreateEventForm({ onSuccess, Event }: SinInFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      EventName: Event ? Event.name : '',
      EventDescription: Event ? Event.description : '',
      // partnerType: Event ? Event.partnerType : '',
      // EventType: Event ? Event.EventType : '',
      price: Event ? Event.price : '',
      musicType: Event ? Event.musicType : '',
      features: Event ? Event.features : '',
      banner: Event ? Event.banner : '',
      phone: '',
      location: {
        address: '',
        cep: '',
        city: '',
        state: '',
        neighborhood: '',
        number: '',
        latitude: '',
        longitude: '',
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSuccess?.();
    console.log(values);
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
          name='EventName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do evento</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='EventDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do evento</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Crie uma descrição para o evento'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='banner'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner</FormLabel>
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
          name='EventType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faixa de idade do evento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um valor' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='alta'>alta</SelectItem>
                  <SelectItem value='media'>média</SelectItem>
                  <SelectItem value='baixa'>baixa</SelectItem>
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
              <FormLabel>Tipo de evento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um valor' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Balada'>Balada</SelectItem>
                  <SelectItem value='Bar Balada'>Bar Balada</SelectItem>
                  <SelectItem value='Universitario'>Universitário</SelectItem>
                  <SelectItem value='Bar'>Bar</SelectItem>
                  <SelectItem value='Show'>Show</SelectItem>
                  <SelectItem value='Festival'>Festival</SelectItem>
                  <SelectItem value='Festa'>Festa</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um valor' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='1'>$</SelectItem>
                  <SelectItem value='2'>$$</SelectItem>
                  <SelectItem value='3'>$$$</SelectItem>
                  <SelectItem value='4'>$$$$</SelectItem>
                  <SelectItem value='5'>$$$$$</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='musicType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de música</FormLabel>
              <ToggleGroup type="multiple" className='flex-wrap' size={"lg"} onValueChange={field.onChange} defaultValue={field.value} variant='outline'>
                <ToggleGroupItem value="Sertanejo" aria-label="Toggle Sertanejo" >
                  Sertanejo
                </ToggleGroupItem>
                <ToggleGroupItem value="Eletronica" aria-label="Toggle Eletronica" >
                  Eletrônica
                </ToggleGroupItem>
                <ToggleGroupItem value="Funk" aria-label="Toggle Funk" >
                  Funk
                </ToggleGroupItem>
                <ToggleGroupItem value="Rock" aria-label="Toggle Rock" >
                  Rock
                </ToggleGroupItem>
                <ToggleGroupItem value="Pop" aria-label="Toggle Pop" >
                  Pop
                </ToggleGroupItem>
                <ToggleGroupItem value="Pagode" aria-label="Toggle Pagode" >
                  Pagode
                </ToggleGroupItem>
                <ToggleGroupItem value="Rap" aria-label="Toggle Rap" >
                  Rap
                </ToggleGroupItem>
                <ToggleGroupItem value="Reggae" aria-label="Toggle Reggae" >
                  Reggae
                </ToggleGroupItem>
                <ToggleGroupItem value="Forro" aria-label="Toggle Axé" >
                  Forró
                </ToggleGroupItem>
                <ToggleGroupItem value="Trap" aria-label="Toggle Trap" >
                  Trap
                </ToggleGroupItem>
                <ToggleGroupItem value="MPB" aria-label="Toggle MPB" >
                  MPB
                </ToggleGroupItem>
              </ToggleGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='features'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adicionais</FormLabel>
              <ToggleGroup type="multiple" className='flex-wrap' size={"lg"} onValueChange={field.onChange} defaultValue={field.value} variant='outline'>
                <ToggleGroupItem value="Estacionamento" aria-label="Toggle Estacionamento" >
                  Estacionamento
                </ToggleGroupItem>
                <ToggleGroupItem value="Fumódromo" aria-label="Toggle Fumódromo" >
                  Fumódromo
                </ToggleGroupItem>
                <ToggleGroupItem value="Valet" aria-label="Toggle Valet" >
                  Valet
                </ToggleGroupItem>
                <ToggleGroupItem value="Área aberta" aria-label="Toggle Área aberta" >
                  Área aberta
                </ToggleGroupItem>
                <ToggleGroupItem value="Welcome shot" aria-label="Toggle Welcome shot" >
                  Welcome shot
                </ToggleGroupItem>
                <ToggleGroupItem value="Mesas" aria-label="Toggle Mesas" >
                  Mesas
                </ToggleGroupItem>
                <ToggleGroupItem value="Open bar" aria-label="Toggle Open bar" >
                  Open bar
                </ToggleGroupItem>
                <ToggleGroupItem value="Ao vivo" aria-label="Toggle Ao vivo" >
                  Ao vivo
                </ToggleGroupItem>
                <ToggleGroupItem value="Esquenta" aria-label="Toggle Esquenta" >
                  Esquenta
                </ToggleGroupItem>
                <ToggleGroupItem value="AFTER" aria-label="Toggle AFTER" >
                  AFTER
                </ToggleGroupItem>
              </ToggleGroup>
              <FormMessage />
            </FormItem>
          )}
        />


        <div className='sticky bottom-0 pt-2 bg-background'>
          <Button type='submit' className='w-full'>
            Criar evento
          </Button>
        </div>
      </form>
    </Form>
  );
}

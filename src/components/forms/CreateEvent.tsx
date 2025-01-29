import { useForm } from 'react-hook-form';
import { date, z } from 'zod';
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
} from "@/components/ui/toggle-group";
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
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar'; // Ensure you import the correct Calendar component
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { useState } from 'react';

const formSchema = z.object({
  EventName: z.string(),
  EventDescription: z.string(),
  partnerType: z.string(),
  ticketURL: z.string(),
  eventCategory: z.string(),
  date: z.number(),
  address: z.string(),
  ageRange: z.string(),
  banner: z.object({
    image: z.string(),
    mimeType: z.string(),
  }),
  gallery: z.array(z.object({
    image: z.string(),
    mimeType: z.string(),
  })),
  price: z.number(),
  instituteId: z.string(),
  musicType: z.array(z.string()),
  features: z.array(z.string()),
  location: addressValidation,
  status: z.string(),
  packages: z.array(z.string()),
});

type FormData = z.infer<typeof formSchema>;

interface SinInFormProps {
  onSuccess?: () => void;
  Event?: Event;
}

export function CreateEventForm({ onSuccess, Event }: SinInFormProps) {

  const [date, setDate] = useState<Date>()
  const instituteId = localStorage.getItem('instituteId');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      EventName: Event ? Event.name : '',
      instituteId: instituteId ? instituteId : '',
      EventDescription: Event ? Event.description : '',
      eventCategory: Event ? Event.eventCategory : '',
      date: Event ? Event.date : '',
      address: Event ? Event.address : '',
      ageRange: Event ? Event.ageRange : '',
      price: Event ? Event.price : '',
      musicType: Event ? Event.musicType : '',
      features: Event ? Event.features : '',
      banner: Event ? Event.banner : '',
      gallery: Event ? Event.gallery : '',
      ticketURL: Event ? Event.ticketURL : '',
      status: Event ? Event.status : '',
      packages: Event ? Event.packages : '',
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
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date ? date.toLocaleDateString() : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white rounded-lg border-2">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
          name='ageRange'
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
                  <SelectItem value='ADOLESCENT'>18-20</SelectItem>
                  <SelectItem value='YOUNG_ADULT'>21-25</SelectItem>
                  <SelectItem value='ADULT'>26-30</SelectItem>
                  <SelectItem value='MATURE_ADULT'>31-40</SelectItem>
                  <SelectItem value='SENIOR'>40+</SelectItem>
                  <SelectItem value='DEFAULT'>TODAS</SelectItem>
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
                  <SelectItem value='BALADA'>Balada</SelectItem>
                  <SelectItem value='BAR_BALADA'>Bar Balada</SelectItem>
                  <SelectItem value='UNIVERSITARIO'>Universitário</SelectItem>
                  <SelectItem value='BAR'>Bar</SelectItem>
                  <SelectItem value='SHOW'>Show</SelectItem>
                  <SelectItem value='FESTIVAL'>Festival</SelectItem>
                  <SelectItem value='FESTA'>Festa</SelectItem>
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
                <ToggleGroupItem value="SERTANEJO" aria-label="Toggle Sertanejo" >
                  Sertanejo
                </ToggleGroupItem>
                <ToggleGroupItem value="ELETRONICA" aria-label="Toggle Eletronica" >
                  Eletrônica
                </ToggleGroupItem>
                <ToggleGroupItem value="FUNK" aria-label="Toggle Funk" >
                  Funk
                </ToggleGroupItem>
                <ToggleGroupItem value="ROCK" aria-label="Toggle Rock" >
                  Rock
                </ToggleGroupItem>
                <ToggleGroupItem value="POP" aria-label="Toggle Pop" >
                  Pop
                </ToggleGroupItem>
                <ToggleGroupItem value="PAGODE" aria-label="Toggle Pagode" >
                  Pagode
                </ToggleGroupItem>
                <ToggleGroupItem value="RAP" aria-label="Toggle Rap" >
                  Rap
                </ToggleGroupItem>
                <ToggleGroupItem value="REGGAE" aria-label="Toggle Reggae" >
                  Reggae
                </ToggleGroupItem>
                <ToggleGroupItem value="FORRO" aria-label="Toggle Axé" >
                  Forró
                </ToggleGroupItem>
                <ToggleGroupItem value="TRAP" aria-label="Toggle Trap" >
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
                <ToggleGroupItem value="ESTACIONAMENTO" aria-label="Toggle Estacionamento" >
                  Estacionamento
                </ToggleGroupItem>
                <ToggleGroupItem value="FUMODROMO" aria-label="Toggle Fumódromo" >
                  Fumódromo
                </ToggleGroupItem>
                <ToggleGroupItem value="VALET" aria-label="Toggle Valet" >
                  Valet
                </ToggleGroupItem>
                <ToggleGroupItem value="AREA_ABERTA" aria-label="Toggle Área aberta" >
                  Área aberta
                </ToggleGroupItem>
                <ToggleGroupItem value="WELCOMO_SHOT" aria-label="Toggle Welcome shot" >
                  Welcome shot
                </ToggleGroupItem>
                <ToggleGroupItem value="MESAS" aria-label="Toggle Mesas" >
                  Mesas
                </ToggleGroupItem>
                <ToggleGroupItem value="OPEN_BAR" aria-label="Toggle Open bar" >
                  Open bar
                </ToggleGroupItem>
                <ToggleGroupItem value="AO_VIVO" aria-label="Toggle Ao vivo" >
                  Ao vivo
                </ToggleGroupItem>
                <ToggleGroupItem value="ESQUENTA" aria-label="Toggle Esquenta" >
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

        <FormField
          control={form.control}
          name='packages'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pacotes</FormLabel>
              <ToggleGroup type="multiple" className='flex-wrap' size={"lg"} onValueChange={field.onChange} defaultValue={field.value} variant='outline'>
                <ToggleGroupItem value="COMBO" aria-label="Toggle COMBO" >
                  Combo
                </ToggleGroupItem>
                <ToggleGroupItem value="ANIVERSARIO" aria-label="Toggle FUMODROMO" >
                  Aniversário
                </ToggleGroupItem>
                <ToggleGroupItem value="CAMAROTE" aria-label="Toggle CAMAROTE" >
                  Camarote
                </ToggleGroupItem>
              </ToggleGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='ticketURL'
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do ticket</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um valor' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='ACTIVE'>Ativo</SelectItem>
                  <SelectItem value='INACTIVE'>Inativo</SelectItem>
                </SelectContent>
              </Select>
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

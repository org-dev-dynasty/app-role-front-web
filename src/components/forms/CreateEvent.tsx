/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { addressValidation } from '@/utils/validations';
import AddressInput from '../input/Address';
import { Separator } from '../ui/separator';
import { CalendarIcon } from 'lucide-react';
import { Event } from '@/api/services/eventService/types';
import { Calendar } from '@/components/ui/calendar'; // Ensure you import the correct Calendar component
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { useEventDispatch } from '@/hooks/useEventDispatch';
import { createEvent } from '@/context/event/actions';
import { CreateEventParams } from '@/api/services/eventService/types';
import { EventFeature } from '@/constants/eventFeature';
import { MusicType } from '@/constants/musicType';
import { ageRangeFields } from '@/constants/ageRange';
import { Region, regionFields } from '@/constants/regions';

const formSchema = z.object({
  name: z.string(),
  description: z.string().min(10, 'Descrição muito curta'),
  menuLink: z.string().optional(),
  ticketUrl: z.string().optional(),
  category: z.string(),
  eventDate: z.coerce.date(),
  ageRange: z.string(),
  eventPhoto: z.instanceof(File),
  district: z.string().min(1, "Selecione um distrito"),
  galleryImages: z.instanceof(File).array(),
  price: z.number(),
  instituteId: z.string(),
  musicType: z.array(z.string()),
  features: z.array(z.string()),
  address: addressValidation,
  packageType: z.array(z.string()),
});

type FormData = z.infer<typeof formSchema>;

interface SinInFormProps {
  onSuccess?: () => void;
  Event?: Event;
}

export function CreateEventForm({ onSuccess, Event }: SinInFormProps) {
  const eventDispatch = useEventDispatch()

  const instituteId = localStorage.getItem('instituteId');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: Event ? Event.name : '',
      instituteId: instituteId ? instituteId : '',
      description: Event ? Event.description : '',
      category: Event ? Event.category : '',
      eventDate: Event ? new Date(Event.eventDate) : undefined,
      menuLink: Event ? Event.menuLink : undefined,
      address: Event ? { ...Event.address, cep: Event.address.cep, address: Event.address.street, number: Event.address.number.toString(), latitude: Event.address.latitude.toString(), longitude: Event.address.longitude.toString() } : {
        address: '',
        cep: '',
        city: '',
        state: '',
        neighborhood: '',
        number: '',
        latitude: '',
        longitude: '',
      },
      ageRange: Event ? Event.ageRange : '',
      price: Event ? Event.price : undefined,
      musicType: Event ? Event.musicType : undefined,
      features: Event ? Event.features : undefined,
      eventPhoto: Event ? (Event.eventPhoto as unknown as File) : undefined,
      galleryImages: Event ? (Event.galleryLink as unknown as File[]) : [],
      ticketUrl: Event ? Event.ticketUrl : '',
      packageType: Event ? Event.packageType : undefined,
      district: Event ? Event.district : '',
    },
  });

  console.log("Event: ", Event);

  function onSubmit(values: z.infer<typeof formSchema>) {
    onSuccess?.();
    console.log("VALORES: ", values);
    if (Event) {
      //conferir se está indo certo (provavelmente não)
      // eventDispatch(updateEvent(
      //   eventData
      // ))
    } else {
      const eventData: CreateEventParams = {
        ...values,
        eventStatus: 'ACTIVE',
        galleryLink: values.galleryImages,
        eventDate: values.eventDate.getTime(),
        address: {
          ...values.address,
          number: parseInt(values.address.number),
          latitude: parseFloat(values.address.latitude),
          longitude: parseFloat(values.address.longitude),
        },
        ageRange: values.ageRange as "18-20" | "21-25" | "26-30" | "31-40" | "40+",
        category: values.category as "BALADA" | "BAR_BALADA" | "UNIVERSITARIO" | "BAR" | "SHOW" | "FESTIVAL" | "FESTA",
        price: values.price,
        musicType: values.musicType as MusicType[],
        features: values.features as EventFeature[],
        menuLink: values.menuLink ? values.menuLink : '',
        ticketUrl: values.ticketUrl ? values.ticketUrl : '',
        packageType: values.packageType as ("COMBO" | "ANIVERSARIO" | "CAMAROTE")[],
        eventPhoto: values.eventPhoto,
        district: values.district as Region

      };
      eventDispatch(createEvent(
        eventData
      ))
    }
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do evento</FormLabel>
              <FormControl>
                {Event ? (
                  <Input disabled {...field} />
                ) : (
                  <Input {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do evento</FormLabel>
              <FormControl>
                {Event ? (
                  <Textarea disabled {...field} />
                ) : (
                  <Textarea {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {Event?.eventId ? (
          <div className='flex flex-col gap-2'>
            <FormLabel>Imagem do evento</FormLabel>
            <img src={Event.eventPhoto} alt="" />
          </div>
        ) : (
          <FormField
            control={form.control}
            name='eventPhoto'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem do evento</FormLabel>
                <FormControl>
                  <ImageInput maxSize={4} onChange={(files: any) => {
                    console.log(files);
                    field.onChange(files?.[0] ?? undefined);
                  }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {Event?.eventId ? (
          <div className='flex flex-col gap-2'>
            <FormLabel>Galeria do evento</FormLabel>
            {Event.galleryLink[0] ? (<img src={Event.galleryLink[0]} alt="" />) : (<p className='text-gray-500'>Nenhuma imagem na galeria</p>)}
          </div>
        ) : (<FormField
          control={form.control}
          name='galleryImages'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Galeria do evento</FormLabel>
              <FormControl>
                <ImageInput maxSize={4} multiple onChange={(files) => {
                  field.onChange(files);
                }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />)}

        <Separator />
        <h2 className='text-xl font-bold'>Contato e localização</h2>

        <FormField
          control={form.control}
          name='eventDate'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button disabled={Event ? true : false} variant='outline' className={cn('w-full', { 'text-gray-400': !field.value })}>
                      <CalendarIcon />
                      {field.value ? field.value.toLocaleDateString() : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white rounded-lg border-2">
                    <Calendar
                      mode="single"
                      selected={field.value}
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

        {!Event && (
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem >
                <FormLabel>Buscar endereço</FormLabel>
                <FormControl>
                  <AddressInput onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />)}

        <FormField
          control={form.control}
          name='address'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  disabled={Event ? true : false}
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
          name='address'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input
                  disabled={Event ? true : false}
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
          name='address'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input
                  disabled={Event ? true : false}
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
          name='address'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input
                  disabled={Event ? true : false}
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
          name='address'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input
                  disabled={Event ? true : false}
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
          name='address'
          render={({ field: { value, onChange, ...props } }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input
                  disabled={Event ? true : false}
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
              <FormLabel>Zona do evento</FormLabel>
              {Event ? (
                <Select disabled onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={Event.address.district} />
                    </SelectTrigger>
                  </FormControl>
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
          name='address'
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
          name='address'
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
              <Select disabled={Event ? true : false} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione um valor' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ageRangeFields.map((ageRange) => (
                    <SelectItem key={ageRange.value} value={ageRange.value}>
                      {ageRange.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de evento</FormLabel>
              <Select disabled={Event ? true : false} onValueChange={field.onChange} defaultValue={field.value}>
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
              <Select disabled={Event ? true : false} onValueChange={(value) => field.onChange(Number(value))}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={Event ? "$".repeat(Event.price) : 'Selecione um valor'} />
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
              {Event ? (
                <ToggleGroup disabled={true} type="multiple" className='flex-wrap' size={"lg"} onValueChange={field.onChange} defaultValue={field.value} variant='outline'>
                  {Event.musicType.map((musicType) => (
                    <ToggleGroupItem key={musicType} value={musicType} aria-label={`Toggle ${musicType}`}>
                      {musicType.match(/_/g) ? musicType.replace(/_/g, ' ') : musicType}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              ) : (<ToggleGroup type="multiple" className='flex-wrap' size={"lg"} onValueChange={field.onChange} defaultValue={field.value} variant='outline'>
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
              </ToggleGroup>)}
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
              {Event ? (
                <ToggleGroup disabled={true} type="multiple" className='flex-wrap' size={"lg"} onValueChange={field.onChange} defaultValue={field.value} variant='outline'>
                  {Event.features.map((feature) => (
                    <ToggleGroupItem key={feature} value={feature} aria-label={`Toggle ${feature}`}>
                      {feature.match(/_/g) ? feature.replace(/_/g, ' ') : feature}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              ) :
                (<ToggleGroup type="multiple" className='flex-wrap' size={"lg"} onValueChange={field.onChange} defaultValue={field.value} variant='outline'>
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
                  <ToggleGroupItem value="WELCOME_SHOT" aria-label="Toggle Welcome shot" >
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
                </ToggleGroup>)}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='packageType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pacotes</FormLabel>
              {Event ? (
                <ToggleGroup disabled={true} type="multiple" className='flex-wrap' size={"lg"} onValueChange={field.onChange} defaultValue={field.value} variant='outline'>
                  {Event.packageType.map((packageType) => (
                    <ToggleGroupItem key={packageType} value={packageType} aria-label={`Toggle ${packageType}`}>
                      {packageType}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              ) : (<ToggleGroup type="multiple" className='flex-wrap' size={"lg"} onValueChange={field.onChange} defaultValue={field.value} variant='outline'>
                <ToggleGroupItem value="COMBO" aria-label="Toggle COMBO" >
                  Combo
                </ToggleGroupItem>
                <ToggleGroupItem value="ANIVERSARIO" aria-label="Toggle FUMODROMO" >
                  Aniversário
                </ToggleGroupItem>
                <ToggleGroupItem value="CAMAROTE" aria-label="Toggle CAMAROTE" >
                  Camarote
                </ToggleGroupItem>
              </ToggleGroup>)}
              <FormMessage />
            </FormItem>
          )}
        />

        {((Event?.ticketUrl != '' || null || undefined) || !Event) && (<FormField
          control={form.control}
          name='ticketUrl'
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do ticket</FormLabel>
              <FormControl>
                <Input disabled={Event ? true : false} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />)}

        {((Event?.menuLink != '' || null || undefined) || !Event) && (<FormField
          control={form.control}
          name='menuLink'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link do menu</FormLabel>
              <FormControl>
                <Input disabled={Event ? true : false} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />)}

        {!Event && (
          <div className='sticky bottom-0 pt-2 bg-background'>
            <Button type='submit' className='w-full'>
              Criar evento
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

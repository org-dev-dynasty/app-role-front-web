import * as Dialog from '@radix-ui/react-dialog'
import { X, CurrencyDollar, Image, Pencil } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import React, { useState } from 'react'

export function EditEventModal() {
  // const [name, setName] = useState<string>()
  // const [description, setDescription] = useState<string>()
  // const [address, setAddress] = useState<string>()
  // const [date, setDate] = useState<Date>()
  // const [priceAvg, setPriceAvg] = useState<number>()
  // const [category, setCategory] = useState<string>()
  // const [age, setAge] = useState<string>()
  // const [musicType, setMusicType] = useState<string>()
  // const [eventStatus, setEventStatus] = useState<string>()

  const [currentDistrict, setCurrentDistrict] = useState<number>(0)

  function mudou(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentDistrict(parseInt(e.target.value))

    console.log(Distritos[currentDistrict].neighborhoods)
  }

  

  const Distritos = [
    {
      name: 'Zona Sul',
      neighborhoods: [
        'Jabaquara',
        'Vila Mariana',
        'Moema',
        'Itaim Bibi',
        'Campo Belo',
        'Brooklin',
        'Vila Olímpia',
        'Santo Amaro',
        'Socorro',
        'Campo Grande',
        'Cidade Dutra',
        'Interlagos',
        'Capela do Socorro',
        'Jardim Ângela',
        'Parelheiros',
        'Grajaú',
        'Capão Redondo',
        'Campo Limpo',
        'Vila Andrade',
        'Morumbi',
        'Jardins',
        'Paraisópolis'
      ]
    },

    {
      name: 'Zona Norte',
      neighborhoods: [
        'Casa Verde',
        'Limão',
        'Santana',
        'Tucuruvi',
        'Mandaqui',
        'Vila Guilherme',
        'Vila Maria',
        'Vila Medeiros',
        'Jaçanã',
        'Tremembé',
        'Horto Florestal',
        'Freguesia do Ó',
        'Pirituba',
        'Brasilândia',
        'Perus',
        'Anhanguera',
        'Jaraguá',
        'Cachoeirinha'
      ]
    },

    {
      name: 'Zona Leste',
      neighborhoods: [
        'Tatuapé',
        'Vila Carrão',
        'Vila Formosa',
        'Penha',
        'Vila Matilde',
        'Itaquera',
        'São Mateus',
        'Vila Prudente',
        'São Lucas',
        'Sapopemba',
        'Cidade Tiradentes',
        'Parque do Carmo',
        'São Miguel Paulista',
        'Ermelino Matarazzo',
        'Vila Jacuí',
        'Iguatemi',
        'Jardim Helena',
        'Cangaíba',
        'Artur Alvim',
        'Guaianases',
        'Lajeado'
      ]
    },

    {
      name: 'Zona Oeste',
      neighborhoods: [
        'Pinheiros',
        'Vila Madalena',
        'Butantã',
        'Perdizes',
        'Barra Funda',
        'Lapa',
        'Vila Leopoldina',
        'Jaguaré',
        'Rio Pequeno',
        'Raposo Tavares',
        'Jardim Bonfiglioli',
        'Cidade Universitária',
        'Sumaré',
        'Pacaembu',
        'Alto de Pinheiros'
      ]
    },

    {
      name: 'Centro',
      neighborhoods: [
        'Sé',
        'República',
        'Bela Vista',
        'Liberdade',
        'Consolação',
        'Santa Cecília',
        'Brás',
        'Bom Retiro',
        'Cambuci',
        'Glicério',
        'Higienópolis'
      ]
    }
  ]

  const options = [
    { value: 'FUNK', label: 'Funk' },
    { value: 'SERTANEJO', label: 'Sertanejo' },
    { value: 'TRAP', label: 'Trap' },
    { value: 'ELETRONICA', label: 'Eletrônica' },
    { value: 'PAGODE', label: 'Pagode' },
    { value: 'ROCK', label: 'Rock' },
    { value: 'RAP', label: 'Rap' },
    { value: 'REGGAE', label: 'Reggae' },
    { value: 'FORRO', label: 'Forró' },
    { value: 'MPB', label: 'MPB' }
  ]

  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="w-fit px-8 py-4 text-2xl rounded-lg bg-purple flex text-center gap-2">
          <Pencil className="self-center" /> Editar ROLE
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-3xl font-medium text-white">
            Editar <span className="text-violet">ROLE</span>
          </Dialog.Title>
          <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-stone-300">
            Utilize os campos abaixos para criar o seu melhor ROLE!
          </Dialog.Description>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="roleName">
              Nome
            </label>
            <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="roleName"
            />
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="description">
              Descrição
            </label>
            <textarea
              className="h-24 px-2 py-2 resize-none bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="description"
            />
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="adress">
              Endereço
            </label>
            <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="adress"
            />
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="date">
              Data
            </label>
            <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet "
              id="date"
              type="datetime-local"
            />
          </fieldset>

          <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 [&>div]:w-1/3 text-white">
            <div className="flex flex-col gap-1">
              <label className="text-base text-white">Preço médio</label>
              <Rating
                allowFraction={false}
                emptyIcon={<CurrencyDollar size={32} className="inline" />}
                initialValue={3}
                fillIcon={
                  <CurrencyDollar size={32} className="inline fill-green-700" />
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-base text-white" htmlFor="age">
                Categoria
              </label>
              <select
                name="category"
                id="category"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
              >
                <option className="outline-none" value="concert">
                  Show
                </option>
                <option className="outline-none" value="club">
                  Balada
                </option>
                <option className="outline-none" value="festival">
                  Festival
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-base text-white" htmlFor="age">
                Idade
              </label>
              <select
                name="age"
                id="age"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
              >
                <option className="outline-none" value="all">
                  Todas as idades
                </option>
                <option className="outline-none" value="legalAge">
                  18+
                </option>
              </select>
            </div>
          </fieldset>

          <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 text-white">
            <div className="flex flex-col gap-1  w-2/3">
              <label className="text-base text-white" htmlFor="musicType">
                Tipo de música
              </label>
              
              <select
                name="musicType"
                id="musicType"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
              >
                {options.map((types, index) => {
                  return (
                    <option value={index} key={index}>
                      {options[index].label}
                    </option>
                  )
                })}
              </select>
                
            </div>

            <div className="flex flex-col gap-1 w-1/3">
              <label className="text-base text-white" htmlFor="age">
                Status do Evento
              </label>
              <select
                name="category"
                id="category"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
              >
                <option className="outline-none" value="active">
                  {'🟢 Ativo'}
                </option>
                <option className="outline-none" value="inactive">
                  {'🔴 Inativo'}
                </option>
                <option className="outline-none" value="maintenance">
                  {'🟡 Manutenção'}
                </option>
              </select>
            </div>
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="ticketLink">
              Link para ingressos
            </label>
            <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="ticketLink"
              placeholder="https://www.example.com.br/ingressos/"
            />
          </fieldset>

          <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 text-white">
            <div className="flex flex-col gap-1  w-1/2">
              <label className="text-base text-white" htmlFor="district">
                Distrito
              </label>
              <select
                name="district"
                id="district"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
                onChange={mudou}
              >
                {Distritos.map((types, index) => {
                  return (
                    <option
                      value={index}
                      defaultValue={currentDistrict}
                      key={index}
                    >
                      {Distritos[index].name}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="flex flex-col gap-1 w-1/2">
              <label className="text-base text-white" htmlFor="age">
                Bairro
              </label>
              <select
                name="category"
                id="category"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
              >
                {Distritos[currentDistrict].neighborhoods.map(
                  (neighborhood, index) => {
                    return (
                      <option value={index} key={index}>
                        {Distritos[currentDistrict].neighborhoods[index]}
                      </option>
                    )
                  }
                )}
              </select>
            </div>
          </fieldset>

          <div className="mb-4 flex text-white justify-around gap-2">
            <div className="flex flex-col w-1/3">
              <label
                className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center "
                htmlFor="bannerImage"
              >
                <Image size={32} className="mx-auto" />
                Imagem do banner
              </label>
              <input
                className="h-10 invisible bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
                id="bannerImage"
                type="file"
              />
            </div>

            <div className="flex flex-col w-1/3">
              <label
                className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center"
                htmlFor="eventImage"
              >
                <Image size={32} className="mx-auto" />
                Imagem do banner
              </label>
              <input
                className="h-10 invisible bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
                id="eventImage"
                type="file"
              />
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <Dialog.Close asChild>
              <button className="inline-flex h-[35px] items-center justify-center rounded bg-violet px-4 font-medium leading-none text-white  hover:bg-violet focus:shadow-[0_0_0_2px] focus:shadow-purple focus:outline-none">
                Salvar Role
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 inline-flex appearance-none items-center justify-center rounded-full text-violet focus:shadow-[0_0_0_2px] focus:shadow-violet focus:outline-none"
              aria-label="Close"
            >
              <X size={32} weight="bold" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

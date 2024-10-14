import * as Dialog from '@radix-ui/react-dialog'
import { X, CurrencyDollar, Image } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import { useState } from 'react'

export function CreateEventModal() {
  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [date, setDate] = useState<Date>()
  const [priceAvg, setPriceAvg] = useState<number>()
  const [category, setCategory] = useState<string>()
  const [age, setAge] = useState<string>()
  const [musicType, setMusicType] = useState<string>()
  const [eventStatus, setEventStatus] = useState<string>()

  const musicTypes = {
    Types: [
      'Funk',
      'Sertanejo',
      'Trap',
      'Eletrônica',
      'Pagode',
      'Rock',
      'Rap',
      'Reggae',
      'Forro',
      'MPB'
    ]
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="absolute bottom-24 h-[35px] items-center justify-center rounded bg-grayModal px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Edit profile
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed overflow-y-auto left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="m-0 text-3xl font-medium text-white">
            Criar <span className="text-violet">ROLE</span>
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
              type="date"
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
                {musicTypes.Types.map((types, index) => {
                  return (
                    <option value={index} key={index}>
                      {musicTypes.Types[index]}
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

          <div className="mb-4 flex text-white justify-around gap-2">
            <div className="flex flex-col w-full">
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

            <div className="flex flex-col w-full">
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

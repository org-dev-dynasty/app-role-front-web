import * as Dialog from '@radix-ui/react-dialog'
import { X, CurrencyDollar } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import React from 'react'

const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="absolute bottom-24 h-[35px] items-center justify-center rounded bg-grayModal px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
        Edit profile
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
      <Dialog.Content className="fixed overflow-auto left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-grayModal p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
        <Dialog.Title className="m-0 text-3xl font-medium text-white">
          Criar <span className="text-violet">ROLE</span>
        </Dialog.Title>
        <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal text-stone-300">
          Utilize os campos abaixos para criar o seu melhor ROLE!
        </Dialog.Description>

        <fieldset className="mb-[15px] flex flex-col gap-1 text-white">
          <label className="text-[15px] text-white" htmlFor="roleName">
            Nome
          </label>
          <input
            className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
            id="roleName"
          />
        </fieldset>

        <fieldset className="mb-[15px] flex flex-col gap-1 text-white">
          <label className="text-[15px] text-white" htmlFor="description">
            Descrição
          </label>
          <textarea
            className="h-24 px-2 py-2 resize-none bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
            id="description"
          />
        </fieldset>

        <fieldset className="mb-[15px] flex flex-col gap-1 text-white">
          <label className="text-[15px] text-white" htmlFor="adress">
            Endereço
          </label>
          <input
            className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
            id="adress"
          />
        </fieldset>

        <fieldset className="mb-[15px] flex flex-col gap-1 text-white">
          <label className="text-[15px] text-white" htmlFor="date">
            Data
          </label>
          <input
            className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet "
            id="date"
            type="date"
          />
        </fieldset>

        <fieldset className="mb-[15px] flex flex-col gap-1 text-white">
          <label className="text-[15px] text-white" htmlFor="adress">
            Preço médio
          </label>
          <Rating
            allowFraction={false}
            emptyIcon={<CurrencyDollar size={32} className="inline" />}
            fillIcon={
              <CurrencyDollar size={32} className="inline fill-green-700" />
            }
            SVGstyle={{ display: 'inline' }}
          />
        </fieldset>

        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="inline-flex h-[35px] items-center justify-center rounded bg-green4 px-[15px] font-medium leading-none text-green-600 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green focus:outline-none">
              Save changes
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

export default DialogDemo

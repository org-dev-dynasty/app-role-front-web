import * as Dialog from '@radix-ui/react-dialog'
import { X, CurrencyDollar, Image, Pencil } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import React, { useContext, useEffect, useState } from 'react'
import { EventType } from '../api/repositories/event_repository'
import { EventContext } from '../context/event_context'
import { Navigate, redirect, useParams } from 'react-router-dom'
import { GroupBase, MultiValue } from 'react-select'
import Select from 'react-select'
import { MultiSelect } from 'react-multi-select-component'
import { MultiSelectComponent, OptionsType } from './MultiSelect'
import { EventInfoUnit } from './EventInfoUnit'
import { z } from 'zod'
import dayjs from 'dayjs'
import {
  categories,
  ageCategories,
  features,
  packageTypeArray,
  status,
  districts,
  musicTypes
} from '../assets/options'
import { ImageInputFile } from './ImageInputFile'

interface MusicType {
  value: string
  label: string
}

export function EditEventModal() {
  const [name, setName] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [date, setDate] = useState<Date>(new Date())
  const [priceAvg, setPriceAvg] = useState<number>()
  const [category, setCategory] = useState<string>('BALADA')
  const [age, setAge] = useState<string>('ADULT')
  const [musicType, setMusicType] = useState<string[]>()
  const [ticketUrl, setTicketUrl] = useState<string>()
  const [eventStatus, setEventStatus] = useState<string>('ACTIVE')
  const [selectedMusic, setSelectedMusic] =
    useState<MultiValue<OptionsType> | null>(null)

  const [eventImage, setEventImage] = useState<File>()
  const [bannerImage, setBannerImage] = useState<File>()

  const [instituteId, setInstituteId] = useState<string>()

  const [selectedMusics, setSelectedMusics] = useState<string[]>([''])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([''])
  const [currentDistrict, setCurrentDistrict] = useState<string>(
    districts[0].districtId
  )

  const [selectedPackages, setSelectedPackages] = useState<
    string[] | undefined
  >([''])

  const [selectedFeaturesOnSel, setSelectedFeaturesOnSel] =
    useState<MultiValue<OptionsType> | null>(null)

  const [selectedPackagesOnSel, setSelectedPackagesOnSel] =
    useState<MultiValue<OptionsType> | null>(null)

  const { getEventById, editEventById, uploadEventBanner, uploadEventImage } =
    useContext(EventContext)

  const [response, setResponse] = useState<EventType>()

  let { eventId } = useParams()

  async function getEventByIdRequest() {
    try {
      const res: EventType = (await getEventById(`${eventId}`)) as EventType
      console.log('Resposta do getEventByIdRequest: ', res)

      if (res) {
        setResponse(res)
      }

      if (!res) {
        console.log('erro response')
        return
      }

      setName(res.name)
      console.log('Nome:', name)
      setDescription(res.description)
      setAddress(res.address)
      // setDate(res.eventDate)
      setInstituteId(res.instituteId)
      setPriceAvg(res.price)
      setCategory(res.category)
      setAge(res.ageRange)
      setMusicType(res.musicType)
      setPriceAvg(res.price)
      setTicketUrl(res.ticketUrl)
      setSelectedMusics(res.musicType)
      setSelectedFeatures(res.features)
      setSelectedPackages(res.packageType)
      setCurrentDistrict(res.districtId)
      setEventStatus(res.eventStatus)

      console.log(name)
      // setEventStatus(response?.eventStatus)
    } catch (error) {
      alert('Erro ao buscar evento: ')
    }
  }

  async function updateEventByIdRequest() {
    try {
      if (!eventId) return

      const updatedEventSchema = z.object({
        name: z.string().min(3),
        description: z.string(),
        address: z.string(),
        eventDate: z.date() /*z.string().datetime()*/,
        price: z.number(),
        category: z.string(),
        ageRange: z.string(),
        musicType: z.array(z.string()),
        districtId: z.string(),
        instituteId: z.string(),
        features: z.array(z.string()),
        packageType: z.array(z.string()),
        ticketUrl: z.string(),
        eventId: z.string(),
        eventStatus: z.string()
      })

      const updatedEvent = {
        name: name,
        description: description,
        address: address,
        eventDate: date /*date*/,
        price: priceAvg,
        category: category,
        ageRange: age,
        musicType: selectedMusics,
        districtId: currentDistrict,
        instituteId: instituteId,
        features: selectedFeatures,
        packageType: selectedPackages,
        ticketUrl: ticketUrl,
        eventId: eventId,
        eventStatus: eventStatus
      }

      await editEventById(updatedEventSchema.parse(updatedEvent))

      // window.location.reload()

      console.log('evento atualizado:', updatedEvent)
    } catch (error) {
      alert('Erro ao editar evento: ')
      console.log(error)

      console.log('data:', date)
    }
  }

  async function uploadEventImageReq(image: File | undefined) {
    if (!image || !eventId) return

    const formData = new FormData()
    const imgType = image.type

    formData.append('eventId', eventId)
    formData.append('typePhoto', imgType)
    formData.append('file', image)

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    const resp = await uploadEventImage(formData)

    console.log('Imagem enviada:', resp)
  }

  async function uploadEventBannerReq(image: File | undefined) {
    if (!image || !eventId) return

    const formData = new FormData()
    const imgType = image.type

    formData.append('eventId', eventId)
    formData.append('typePhoto', imgType)
    formData.append('file', image)

    const resp = await uploadEventBanner(formData)
    console.log('Banner enviado:', resp)
  }

  function x(e: File) {
    console.log(eventImage)
    setEventImage(e)
    console.log(eventImage)
    uploadEventImageReq(eventImage)
  }

  function y(e: File) {
    console.log(bannerImage)
    setBannerImage(e)
    console.log(bannerImage)
    uploadEventBannerReq(bannerImage)
  }

  useEffect(() => {
    console.log('Chamando useEffect getEvent:')
    getEventByIdRequest()

    // setEventStatus(response?.eventStatus)
  }, [])

  const handleChange = (selected: MultiValue<OptionsType>) => {
    setSelectedMusic(selected)

    setSelectedMusics(selected.map(option => option.value))

    console.log(selectedMusics)
  }

  const handleFeaturesSelectChange = (selected: MultiValue<OptionsType>) => {
    setSelectedFeaturesOnSel(selected)

    setSelectedFeatures(selected.map(option => option.value))

    console.log(selectedFeatures)
  }

  const handlePackageTypeSelectChange = (selected: MultiValue<OptionsType>) => {
    setSelectedPackagesOnSel(selected)

    setSelectedPackages(selected.map(option => option.value))

    console.log(selectedPackagesOnSel)
  }

  const convertToDateTimeLocalString = (date: Date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    const x: string = `${year}-${month}-${day}T${hours}:${minutes}`

    return x
  }

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
              defaultValue={response?.name}
              onChange={e => setName(e.target.value)}
            />
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="description">
              Descrição
            </label>
            <textarea
              className="h-24 px-2 py-2 resize-none bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="description"
              defaultValue={response?.description}
              onChange={e => setDescription(e.target.value)}
            />
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="adress">
              Endereço
            </label>
            <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet"
              id="adress"
              defaultValue={response?.address}
              onChange={e => setAddress(e.target.value)}
            />
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white" htmlFor="date">
              Data
            </label>
            {/* <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet "
              id="date"
              type="datetime-local"
              defaultValue={convertToDateTimeLocalString(
                new Date(response?.eventDate ?? new Date())
              )}
              onChange={e => {
                setDate(new Date(e.target.value))
                console.log(e.target.value, date)
              }}
            /> */}
            <input
              className="h-10 px-2 bg-grayInputModal outline-none rounded-md focus:ring-2 ring-violet "
              id="date"
              type="datetime-local"
              defaultValue={convertToDateTimeLocalString(
                new Date(response?.eventDate ?? new Date())
              )}
              // onChange={e => {
              //   setDate(new Date(e.target.value).toISOString())
              //   console.log(e.target.value, date)
              // }}
            />
          </fieldset>

          <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 [&>div]:w-1/3 text-white">
            <div className="flex flex-col gap-1">
              <label className="text-base text-white">Preço médio</label>
              <Rating
                onClick={e => setPriceAvg(e)}
                allowFraction={false}
                emptyIcon={<CurrencyDollar size={32} className="inline" />}
                initialValue={response?.price}
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
                defaultValue={response?.category}
                onChange={e => setCategory(e.target.value)}
              >
                {categories.map((category, index) => {
                  return (
                    <option value={category.key} key={index}>
                      {category.value}
                    </option>
                  )
                })}
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
                {ageCategories.map((ageCategory, index) => {
                  return (
                    <option
                      value={ageCategory.value}
                      key={index}
                      onChange={() => setAge(ageCategory.value)}
                    >
                      {ageCategory.label}
                    </option>
                  )
                })}
              </select>
            </div>
          </fieldset>

          <fieldset className="mb-4 flex w-full justify-between flex-row gap-8 text-white">
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-base text-white" htmlFor="district">
                  Distrito
                </label>
                <select
                  name="district"
                  id="district"
                  className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
                  onChange={e => setCurrentDistrict(e.target.value)}
                >
                  {districts.map((district, index) => {
                    return (
                      <option
                        value={districts[index].districtId}
                        key={index}
                        // onChange={() => setCurrentDistrict(1)}
                      >
                        {districts[index].districtName}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1 w-1/3">
              <label className="text-base text-white" htmlFor="age">
                Status do Evento
              </label>
              <select
                name="category"
                id="category"
                className="bg-grayInputModal outline-none hover:cursor-pointer p-2 rounded-lg"
                onChange={e => setEventStatus(e.target.value)}
              >
                {status.map((status, index) => {
                  return (
                    <option value={status.value} key={index}>
                      {status.label}
                    </option>
                  )
                })}
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
              defaultValue={ticketUrl}
              onChange={e => setTicketUrl(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <div className="flex flex-col gap-1">
              <label className="text-base text-white" htmlFor="musicType">
                Tipo de música
              </label>

              <MultiSelectComponent
                defaultValue={selectedMusics}
                onChange={handleChange}
                options={musicTypes}
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="flex flex-col w-full gap-1">
              <label className="text-base text-white">Features</label>

              <MultiSelectComponent
                defaultValue={selectedFeatures}
                onChange={handleFeaturesSelectChange}
                options={features}
              />
            </div>
          </fieldset>

          <fieldset className="mb-4 flex flex-col gap-1 text-white">
            <label className="text-base text-white">Pacotes</label>

            <MultiSelectComponent
              defaultValue={selectedPackages}
              onChange={handlePackageTypeSelectChange}
              options={packageTypeArray}
            />
          </fieldset>

          <div className="flex gap-4">
            <div className="w-full">
              <ImageInputFile
                onImageUploaded={e => x(e)}
                defaultValue={response?.eventPhotoLink}
                label="Selecione a imagem do ROLE"
              />
            </div>

            <div className="w-full">
              <ImageInputFile
                onImageUploaded={e => y(e)}
                defaultValue={response?.bannerUrl}
                aspect="video"
                label="Selecione a imagem do banner"
              />
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={updateEventByIdRequest}
                className="inline-flex h-[35px] items-center justify-center rounded bg-violet px-4 font-medium leading-none text-white  hover:bg-violet focus:shadow-[0_0_0_2px] focus:shadow-purple focus:outline-none"
              >
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

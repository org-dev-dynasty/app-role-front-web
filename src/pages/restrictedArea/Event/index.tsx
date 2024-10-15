import { CurrencyDollar } from '@phosphor-icons/react'
import { Rating } from 'react-simple-star-rating'
import { EventInfoUnit } from '../../../components/EventInfoUnit'
import { EditEventModal } from '../../../components/EditEventModal'

export default function Role() {
  return (
    <div className="bg-[#151515] w-screen h-screen text-white">
      <div className="flex flex-col max-w-[1600px] mx-auto bg-[#151515] h-screen">
        <div className="flex p-4 mt-6 w-full">
          <img
            className="max-w-xs rounded-3xl"
            src="https://picsum.photos/500/500"
            alt="event img"
          />
          <div className="flex flex-col ml-8 gap-4 w-full">
            <div className="flex justify-between max-w-4xl w-full items-center">
              <div className="flex items-center gap-4 w-full">
                <h1 className="text-6xl font-light">Mahau Bar</h1>

                <Rating
                  allowFraction={false}
                  emptyIcon={<CurrencyDollar size={32} className="inline" />}
                  initialValue={3}
                  fillIcon={
                    <CurrencyDollar
                      size={32}
                      className="inline fill-green-700"
                    />
                  }
                  readonly
                  className="relative top-1"
                />
              </div>
            </div>
            <h2 className="text-2xl text-[#b3b3b3] max-w-2xl">
              Restaurante/bar chique com petiscos e drinks sofisticados, além de
              apresentações musicais em um deque na cobertura.
            </h2>

            <div className="flex text-nowrap flex-col gap-2 text-[#ffffff]">
              <span className="text-2xl">31/12/2024</span>
              <span className="text-xl">Inicio as 22:00 {'GMT -03:00'}</span>
            </div>

            <EditEventModal />
          </div>
        </div>

        <div className="justify-center items-center mt-12 text-2xl flex bg-purple/10 rounded-2xl p-10">
          <div className="flex flex-col gap-4">
            <EventInfoUnit value="address" label="Endereço">
              R. Prof. Atílio Innocenti, 160
            </EventInfoUnit>
            <EventInfoUnit value="district" label="Distrito">
              Zona Sul
            </EventInfoUnit>
            <EventInfoUnit value="neighbourhood" label="Bairro">
              Vila Nova Conceição
            </EventInfoUnit>
          </div>

          <div className="flex flex-col gap-4">
            <EventInfoUnit value="musicType" label="Tipo de música">
              TRAP
            </EventInfoUnit>
            <EventInfoUnit value="ageRange" label="Idade permitida">
              18+
            </EventInfoUnit>
            <EventInfoUnit value="eventStatus" label="Status do evento">
              🟢 Ativo
            </EventInfoUnit>
          </div>

          <div className="flex flex-col gap-4">
            <EventInfoUnit value="features" label="Características">
              Música ao vivo, Rodizío
            </EventInfoUnit>
            <EventInfoUnit value="ageRange" label="Idade permitida">
              18+
            </EventInfoUnit>
            <EventInfoUnit value="eventStatus" label="Status do evento">
              🟢 Ativo
            </EventInfoUnit>
          </div>

          <div className="flex flex-col gap-4">
            <EventInfoUnit value="features" label="Características">
              Música ao vivo, Rodizío
            </EventInfoUnit>
            <EventInfoUnit value="ageRange" label="Idade permitida">
              18+
            </EventInfoUnit>
            <EventInfoUnit value="eventStatus" label="Status do evento">
              🟢 Ativo
            </EventInfoUnit>
          </div>
        </div>
      </div>
    </div>
  )
}

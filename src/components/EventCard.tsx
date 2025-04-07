import { Event } from "@/api/services/eventService/types";

interface EventCardProps {
  event: Event;
  onclick?: (event: Event ) => void;
}

export default function EventCard({ event, onclick }: EventCardProps) {
  return (
    <div className="bg-[#2A2A2A] full h-[300px] rounded-xl m-4 shadow-white shadow-sm border-2 border-white hover:cursor-pointer" onClick={() => onclick && onclick(event)}>
      <div className="h-[60%] bg-[#151515] rounded-t-xl">
        <img src={ event.eventPhoto } alt="event" className="w-full h-full object-cover rounded-t-xl" />
      </div>
      <div className="h-[40%] p-4">
        <h1 className="text-white text-2xl hover:underline">{ event.name }</h1>
      </div>
    </div>
  )
}
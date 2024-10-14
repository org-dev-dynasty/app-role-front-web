
interface EventCardProps {
  name: string;
  imageUrl: string;
}

export default function EventCard({ name, imageUrl }: EventCardProps) {
  return (
    <div className="bg-[#2A2A2A] w-[300px] h-[400px] rounded-xl m-4 shadow-white shadow-sm border-2 border-white hover:cursor-pointer">
      <div className="h-[60%] bg-[#151515] rounded-t-xl">
        <img src={ imageUrl } alt="event" className="w-full h-full object-cover rounded-t-xl" />
      </div>
      <div className="h-[40%] p-4">
        <h1 className="text-white text-2xl hover:underline">{ name }</h1>
      </div>
    </div>
  )
}
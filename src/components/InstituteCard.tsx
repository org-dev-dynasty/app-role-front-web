

export default function InstituteCard({ name, imageUrl }: { name: string, imageUrl: string }) {
    return (
        <div className="h-64 w-[30vw] bg-purple rounded-xl p-4 justify-evenly flex flex-row  items-center text-white hover:cursor-pointer m-4">
            <div className="rounded-full h-40 w-40 bg-light-purple flex justify-center items-center overflow-hidden">
                <img src={imageUrl} alt="Logo do instituto" className="h-full w-full object-cover flex justify-center items-center"/>
            </div>
            <h1 className="text-white text-xl">{name}</h1>
        </div>
    )
}
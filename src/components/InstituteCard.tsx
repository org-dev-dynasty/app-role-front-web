

export default function InstituteCard({ name, imageUrl }: { name: string, imageUrl: string }) {
    return (
        <div className="h-64 w-[30vw] bg-purple rounded-xl p-4 justify-evenly flex flex-row  items-center text-white">
            <div className="rounded-full h-40 w-40 bg-light-purple flex justify-center items-center">
                <img src={imageUrl} alt="Logo do instituto" />
            </div>
            <h1 className="text-white text-xl">{name}</h1>
        </div>
    )
}
export default function InstituteCard({ name, imageUrl }: { name: string, imageUrl: string }) {
    return (
        <div className="h-64 w-[18rem] md:w-fit bg-purple rounded-xl p-4 flex flex-col md:flex-row justify-evenly items-center text-white hover:cursor-pointer md:min-w-[28rem] m-4">
            <div className="rounded-full h-32 w-32 md:h-40 md:w-40 bg-light-purple flex justify-center items-center overflow-hidden mb-4 md:mb-0">
                <img src={imageUrl} alt="Logo do instituto" className="h-full w-full object-cover" />
            </div>
            <h1 className="text-white text-lg md:text-xl text-center md:text-left w-1/2">{name}</h1>
        </div>
    );
}

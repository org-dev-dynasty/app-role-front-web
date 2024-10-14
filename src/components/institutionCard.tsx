interface InstitutionCardProps {
    name: string;
    img: string;
    onClick?: () => void;
}

export default function InstitutionCard({ name, img, onClick }: InstitutionCardProps) {
    return (
        <div className="flex w-[70%] h-20 rounded-lg shadow-md border-black bg-white items-center hover:cursor-pointer flex-row"
            onClick={onClick}>
            <div className="rounded-sm h-12 w-12 bg-blue-600 shadow-md m-4" >
                <img className="text-xs" src={img} alt={`${name}`} />
            </div>
            <p className="hover:underline">{name}</p>
        </div>
    )
}
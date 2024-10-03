interface InstitutionCardProps {
    name: string;
    onClick?: () => void;
}

export default function InstitutionCard({name, onClick} : InstitutionCardProps) {
    return (
        <div className="flex w-[70%] h-20 rounded-xl border-4 border-black bg-slate-300 shadow-sm items-center hover:cursor-pointer flex-row"
        onClick={onClick}>
            <div className="rounded-lg h-12 w-12 bg-blue-600 m-4" />
            <p className="hover:underline">{name}</p>
        </div>
    )
}
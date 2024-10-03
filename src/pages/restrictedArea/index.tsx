import InstitutionCard from "../../components/institutionCard";


export default function RestrictedArea() {
    return (
        <div className="flex h-screen w-full justify-center items-center">
            <div className="flex flex-col w-[90%] items-center h-[90%] rounded-xl border-4 border-black bg-slate-300 shadow-sm">
                <div className="w-full border-b-4 flex items-center justify-between px-20 border-black h-[14%]">
                    <h1 className="text-3xl">Instituições</h1>
                    <div className="h-16 w-16 bg-light-purple rounded-3xl hover:bg-violet hover:cursor-pointer" />
                </div>
                <div className="pt-4 flex flex-col flex-1 overflow-y-auto w-full items-center gap-4">
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                    <InstitutionCard />
                </div>
            </div>
        </div>
    )
}
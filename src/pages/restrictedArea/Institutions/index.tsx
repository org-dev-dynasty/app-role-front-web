import { SetStateAction, useContext, useEffect, useState } from "react"
import { envs } from "../../../utils/envs"
import InstituteCard from "../../../components/InstituteCard"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { InstituteContext } from "../../../context/institute_context"

interface Institute {
    institute_id: string;
    name: string;
    description: string;
    institute_type: string;
    partner_type: string;
    phone: string;
    logo_photo: string;
    address: string;
    price: number;
    district_id: string;
    photos_url: string[];
    events_id: string[];
}

export default function Institutions() {
    const { getAllInstitutes } = useContext(InstituteContext)
    const [institutes, setInstitutes] = useState<Institute[]>([])
    
    async function getAll() {
        const response = await getAllInstitutes(); // Use await aqui se a função for assíncrona
        setInstitutes(response); // Verifique se o response é um array
        console.log(response);
    }

    useEffect(() => {
        getAll()
    }, [])

    const [search, setSearch] = useState("")
    const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
        setSearch(e.target.value)
    }
    return (
        <div className="h-full w-full flex flex-col bg-[#151515]" >
            <div className="h-[16vh] w-full flex flex-col py-6 bg-[#2A2A2A] items-center gap-10 px-14 border-b-2 border-[#6A6A6A]" >
                <div className="flex h-full items-center w-full justify-between">
                    <div className="flex h-full items-center gap-4">
                        <div className="h-16 px-4 rounded-lg flex justify-center items-center w-[34vw] text-white text-3xl bg-[#6A6A6A] placeholder:text-white">
                            <MagnifyingGlass size={32} />
                            <input type="text" value={search} onChange={handleChange} placeholder="Pesquisar" className="h-16 px-4 rounded-lg w-full text-white text-3xl bg-[#6A6A6A] placeholder:text-white outline-none" />
                        </div>
                        <button className="h-16 w-16 rounded-lg bg-light-purple text-white text-2xl hover:bg-purple">+</button>
                        <h1 className="text-white text-3xl">Nova Instituição</h1>
                    </div>
                    <div>
                        <img src={`${envs.cloudfrontUrl}/approle_logo_navbar.png`} alt="AppRole Logo" className="h-16" />
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap h-[84vh] overflow-y-auto justify-center gap-4 pt-6">
                {institutes.map((institute) => {
                    return (
                        <div>
                            <InstituteCard name={institute.name} imageUrl={institute.logo_photo} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
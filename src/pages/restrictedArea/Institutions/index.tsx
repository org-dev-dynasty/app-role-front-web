import { useState } from "react";
import InstitutionCard from "../../../components/institutionCard";
import { InstituteModal, InstituteModalUpdate } from "../../../components/instituteModal";
import CreateInstituteModal from "../../../components/CreateInstituteModal";
import { useNavigate } from "react-router-dom";

export interface institutionProps {
    photo: string;
    name: string;
    description: string;
    institution_type: string;
    partner_type: string;
    // Opcionais
    address?: string;
    district_id?: string;
    price?: string;
}


const institutions: institutionProps[] = [
    {
        photo: "https://source.unsplash.com/random/200x200",
        name: "Instituição 1",
        description: "Descrição da instituição 1",
        institution_type: "Tipo 1",
        partner_type: "Parceiro 1",
        address: "Endereço 1",
        district_id: "Distrito 1",
        price: "Preço 1",
    },
    {
        photo: "https://source.unsplash.com/random/200x200",
        name: "Instituição 2",
        description: "Descrição da instituição 2",
        institution_type: "Tipo 2",
        partner_type: "Parceiro 2",
        address: "Endereço 2",
        district_id: "Distrito 2",
        price: "Preço 2",
    },
    {
        photo: "https://source.unsplash.com/random/200x200",
        name: "Instituição 3",
        description: "Descrição da instituição 3",
        institution_type: "Tipo 3",
        partner_type: "Parceiro 3",
        address: "Endereço 3",
        district_id: "Distrito 3",
        price: "Preço 3",
    },
    {
        photo: "https://source.unsplash.com/random/200x200",
        name: "Instituição 4",
        description: "Descrição da instituição 4",
        institution_type: "Tipo 4",
        partner_type: "Parceiro 4",
        address: "Endereço 4",
        district_id: "Distrito 4",
        price: "Preço 4",
    },
    {
        photo: "https://source.unsplash.com/random/200x200",
        name: "Instituição 5",
        description: "Descrição da instituição 5",
        institution_type: "Tipo 5",
        partner_type: "Parceiro 5",
        address: "Endereço 5",
        district_id: "Distrito 5",
        price: "Preço 5",
    },
    {
        photo: "https://source.unsplash.com/random/200x200",
        name: "Instituição 6",
        description: "Descrição da instituição 6",
        institution_type: "Tipo 6",
        partner_type: "Parceiro 6",
        address: "Endereço 6",
        district_id: "Distrito 6",
        price: "Preço 6",
    }
]

export default function Institutes() {
    const [instSelected, setInstSelected] = useState<institutionProps | null>(null);
    const [isCreateActive, setIsCreateActive] = useState<boolean>(false);
    const [updateselected, setUpdateselected] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleToggleCRUD = () => {
        console.log("CRUD");
        navigate("/roles");
    }

    return (
        <div className="flex h-screen w-full justify-center items-center bg-white">
            {instSelected && (
                <InstituteModal
                    instSelected={instSelected}
                    onClick={() => setInstSelected(null)}
                    setUpdate={() => setUpdateselected(true)}
                    onDelete={() => setInstSelected(null)}
                />
            )}
            {updateselected && (
                <InstituteModalUpdate
                    instSelected={instSelected}
                    onClick={() => setUpdateselected(false)}
                    setUpdate={() => setUpdateselected(false)}
                    onDelete={() => setInstSelected(null)}
                />)}
            {isCreateActive && (
                <CreateInstituteModal onClick={() => setIsCreateActive(false)} />
            )}

            <div className="flex flex-col w-[90%] items-center h-[90%] rounded-xl border-4 border-black bg-slate-300 shadow-sm">
                <div className="w-full border-b-4 flex items-center justify-between z-30 px-10 backdrop-blur-lg border-black h-[14%]">
                    <div className="flex flex-row gap-4">
                        <h1 className="text-3xl">Instituições</h1>
                        <div className="h-10 w-20 bg-white flex justify-center items-center rounded-lg shadow-md hover:cursor-pointer hover:bg-white-purple" onClick={handleToggleCRUD}>
                            <h5 className="" >Rolês</h5>
                        </div>
                    </div>
                    <div
                        className="h-16 w-16 bg-violet flex justify-center items-center rounded-lg hover:bg-light-purple hover:cursor-pointer duration-100"
                        onClick={() => setIsCreateActive(true)}
                    >
                        <p className="text-3xl text-white">+</p>
                    </div>
                </div>

                <div className="py-4 flex flex-col flex-1 overflow-y-auto w-full items-center gap-4">
                    {institutions.map((institution, index) => (
                        <InstitutionCard
                            key={index}
                            name={institution.name}
                            onClick={() => setInstSelected(institution)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
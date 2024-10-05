import { useState } from "react";
import InstitutionCard from "../../components/institutionCard";
import { InstituteModal, InstituteModalUpdate } from "../../components/instituteModal";
import CreateInstituteModal from "../../components/CreateInstituteModal";



const institutions = [
    {
        name: "Instituição 1"
    },
    {
        name: "Instituição 2"
    },
    {
        name: "Instituição 3"
    },
    {
        name: "Instituição 4"
    },
    {
        name: "Instituição 5"
    },
    {
        name: "Instituição 6"
    },
    {
        name: "Instituição 7"
    },
    {
        name: "Instituição 8"
    },
    {
        name: "Instituição 9"
    },
    {
        name: "Instituição 10"
    },
    {
        name: "Instituição 11"
    },
    {
        name: "Instituição 12"
    },
    {
        name: "Instituição 13"
    },
    {
        name: "Instituição 14"
    },
    {
        name: "Instituição 15"
    },
    {
        name: "Instituição 16"
    },
    {
        name: "Instituição 17"
    },
    {
        name: "Instituição 18"
    },
    {
        name: "Instituição 19"
    },
    {
        name: "Instituição 20"
    },
    {
        name: "Instituição 21"
    },
    {
        name: "Instituição 22"
    },
    {
        name: "Instituição 23"
    },
    {
        name: "Instituição 24"
    },
    {
        name: "Instituição 25"
    },
    {
        name: "Instituição 26"
    },
    {
        name: "Instituição 27"
    },
    {
        name: "Instituição 28"
    },
    {
        name: "Instituição 29"
    },
    {
        name: "Instituição 30"
    },
    {
        name: "Instituição 31"
    },
    {
        name: "Instituição 32"
    },
    {
        name: "Instituição 33"
    },
    {
        name: "Instituição 34"
    },
    {
        name: "Instituição 35"
    }
]

export default function RestrictedArea() {
    const [instSelected, setInstSelected] = useState<string | null>(null);
    const [isCreateActive, setIsCreateActive] = useState<boolean>(false);
    const [updateselected, setUpdateselected] = useState<boolean>(false);

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
                    <h1 className="text-3xl">Instituições</h1>
                    <div
                        className="h-16 w-16 bg-purple-500 flex justify-center items-center rounded-lg hover:bg-violet-700 hover:cursor-pointer"
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
                            onClick={() => setInstSelected(institution.name)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
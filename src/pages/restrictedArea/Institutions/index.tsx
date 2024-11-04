import { SetStateAction, useContext, useEffect, useState } from "react";
import { envs } from "../../../utils/envs";
import InstituteCard from "../../../components/InstituteCard";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { InstituteContext } from "../../../context/institute_context";
import CreateInstituteModal from "../../../components/createInstituteModal";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

interface Institute {
    instituteId: string;
    name: string;
    description: string;
    institute_type: string;
    partner_type: string;
    phone: string;
    logoPhoto: string;
    address: string;
    price: number;
    district_id: string;
    photos_url: string[];
    events_id: string[];
}

export default function Institutions() {
    const { getAllInstitutes } = useContext(InstituteContext);
    const [institutes, setInstitutes] = useState<Institute[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateInstituteModalOpen, setIsCreateInstituteModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchInstitutes();
    }, [getAllInstitutes, isCreateInstituteModalOpen]);

    const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
        setSearch(e.target.value);
    };

    const fetchInstitutes = async () => {
        setLoading(true);
        try {
            const response = await getAllInstitutes();
            console.log(response);
            if (response && response.institutes) {
                setInstitutes([...response.institutes]);
            }
        } catch (error) {
            console.error("Erro ao buscar institutos:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredInstitutes = institutes.filter((institute) =>
        institute.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-full w-full flex flex-col bg-[#151515]">
            {isCreateInstituteModalOpen && (
                <CreateInstituteModal
                    setIsCreateInstituteModalOpen={setIsCreateInstituteModalOpen}
                    onInstituteCreated={fetchInstitutes}
                />
            )}

            <div className="md:h-[18vh] h-[20vh] w-full flex flex-col py-6 bg-[#2A2A2A] items-center gap-4 md:gap-6 px-4 md:px-10 border-b-2 border-[#6A6A6A]">
                <div className="flex h-full items-center w-full justify-between flex-wrap gap-4">
                    <div className="flex h-full mt-4 md:mt-0 flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="flex items-center h-12 md:h-16 px-2 md:px-4 rounded-lg w-full md:w-[34vw] text-white text-lg md:text-3xl bg-[#6A6A6A] placeholder:text-white">
                            <MagnifyingGlass size={24} />
                            <input
                                type="text"
                                value={search}
                                onChange={handleChange}
                                placeholder="Pesquisar"
                                className="h-full px-2 md:px-4 rounded-lg w-full text-white text-lg md:text-3xl bg-[#6A6A6A] placeholder:text-white outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                className="h-12 w-12 md:h-16 md:w-16 rounded-lg bg-light-purple text-white text-lg md:text-2xl hover:bg-purple"
                                onClick={() => setIsCreateInstituteModalOpen(true)}
                            >
                                +
                            </button>
                            <h1 className="text-white text-lg md:text-3xl">Nova Instituição</h1>
                        </div>
                    </div>
                    <div className="flex invisible lg:visible justify-center md:justify-end w-full md:w-auto">
                        <img
                            src={`${envs.cloudfrontUrl}/approle_logo_navbar.png`}
                            alt="AppRole Logo"
                            className="h-12 md:h-16"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap h-[80vh] overflow-y-auto justify-center pt-4 pb-4 md:h-[82vh] gap-4 md:gap-6">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <ClipLoader color="#ffffff" size={100} />
                    </div>
                ) : (
                    filteredInstitutes.map((institute) => (
                        <div className="h-fit" key={institute.instituteId} onClick={() => navigate(`/institute/${institute.instituteId}`)}>
                            <InstituteCard
                                name={institute.name}
                                imageUrl={institute.logoPhoto}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

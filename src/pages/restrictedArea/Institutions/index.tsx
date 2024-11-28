import { SetStateAction, useContext, useEffect, useState } from "react";
import { envs } from "../../../utils/envs";
import InstituteCard from "../../../components/InstituteCard";
import { MagnifyingGlass, SignOut } from "@phosphor-icons/react";
import { InstituteContext } from "../../../context/institute_context";
import CreateInstituteModal from "../../../components/createInstituteModal";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { Bounce, toast, ToastContainer } from "react-toastify";

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
        const token = localStorage.getItem("idToken");
        if (!token || token === "undefined") {
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        fetchInstitutes();
    }, [getAllInstitutes, isCreateInstituteModalOpen]);

    const [instituteCreated, setInstituteCreated] = useState(false);

    useEffect(() => {
        if (instituteCreated) {
            toast.success('Instituto criado com sucesso', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setInstituteCreated(false); // Reseta o estado após exibir o toast
        }
    }, [instituteCreated]);

    const handleLogout = () => {
        localStorage.removeItem("idToken");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/login");
    }

    const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
        setSearch(e.target.value);
    };

    const fetchInstitutes = async () => {
        setLoading(true);
        try {
            const response = await getAllInstitutes();
            console.log(response);
            if (response && response.institutes) {
                const institutesData: Institute[] = response.institutes.map((institute: any) => ({
                    instituteId: institute.instituteId,
                    name: institute.name,
                    description: institute.description,
                    institute_type: institute.institute_type,
                    partner_type: institute.partner_type,
                    phone: institute.phone,
                    logoPhoto: institute.logoPhoto,
                    address: institute.address,
                    price: institute.price,
                    district_id: institute.district_id,
                    photos_url: institute.photos_url,
                    events_id: institute.events_id,
                }));
                setInstitutes(institutesData);
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
                    onInstituteCreated={() => {setInstituteCreated(true);fetchInstitutes;}}
                />
            )}
            <div className="md:h-[18vh] h-[20vh] w-full flex flex-col py-6 bg-[#2A2A2A] items-center gap-4 md:gap-6 px-4 md:px-10 border-b-2 border-[#6A6A6A]">
                <div className="flex h-full items-center w-full justify-between flex-wrap gap-4">
                    <div className="flex h-full mt-4 md:mt-0 flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="flex  shadow-lg items-center h-12 md:h-16 px-2 md:px-4 rounded-lg w-full md:w-[34vw] text-white text-lg md:text-3xl bg-[#6A6A6A] placeholder:text-white">
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
                                className="h-12 w-12 md:h-16 md:w-16 rounded-lg shadow-lg bg-light-purple text-white text-lg md:text-2xl hover:bg-purple"
                                onClick={() => setIsCreateInstituteModalOpen(true)}
                            >
                                +
                            </button>
                            <h1 className="text-white text-lg md:text-3xl">Nova Instituição</h1>
                        </div>
                    </div>
                    <div className="flex invisible lg:visible justify-center md:justify-end w-full md:w-auto">
                        <button
                            className="h-12 w-12 md:h-16 md:w-16 shadow-lg rounded-lg bg-light-purple text-white text-lg md:text-2xl hover:bg-purple flex justify-center items-center mr-4"
                            onClick={() => handleLogout()}
                        >
                            <SignOut size={32} />
                        </button>
                        <img
                            src={`${envs.cloudfrontUrl}/approle_logo_navbar.png`}
                            alt="AppRole Logo"
                            className="h-12 md:h-16 "
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

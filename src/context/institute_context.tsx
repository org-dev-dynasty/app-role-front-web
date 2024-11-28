import { createContext, PropsWithChildren } from "react"
import { InstituteRepositoryHttp } from "../api/repositories/institute_repository"
import { InstituteProps } from "../components/updateInstituteModal";

interface Institute {
    institute_id: string;
    name: string;
    description: string;
    institute_type: string;
    phone?: string | undefined;
    logo_photo?: string;
    partner_type?: string | undefined;
    address?: string | undefined;
    price?: number | undefined;
    district_id?: string | undefined;
    events_id?: string[] | undefined;
}

interface getAllInstitutesResponse {
    institutes: Institute[]
}

interface getInstituteByIdResponse {
    institute: Institute
}

interface createInstituteResponse {
    message: string
}

interface deleteInstituteByIdResponse {
    message: string
}

interface updateInstituteByIdResponse {
    message: string
}

interface uploadInstituteImageResponse {
    message: string
}

type InstituteContextType = {
    getAllInstitutes: () => Promise<getAllInstitutesResponse>
    getInstituteById: (id: string) => Promise<getInstituteByIdResponse>
    createInstitute?: (data: Institute) => Promise<createInstituteResponse>
    deleteInstituteById?: (id: string) => Promise<deleteInstituteByIdResponse>
    updateInstituteById?: (data: Partial<InstituteProps>) => Promise<updateInstituteByIdResponse>
    uploadInstituteImage?: (data: FormData) => Promise<uploadInstituteImageResponse>
}


const defaultInstitute = {
    getAllInstitutes: async () => {
        return {
            institutes: []
        }
    },
    getInstituteById: async (id: string) => {
        return {
            institute: {
                institute_id: "",
                name: "",
                description: "",
                institute_type: "",
                phone: "",
                logo_photo: "",
                address: "",
                price: 0,
                district_id: "",
                events_id: []
            }
        }
    },
    createInstitute: async (data: Institute) => {
        return {
            message: ""
        }
    },
    deleteInstituteById: async (id: string) => {
        return {
            message: ""
        }
    },
    updateInstituteById: async (data: InstituteProps) => {
        return {
            message: ""
        }
    },
    uploadInstituteImage: async (data: FormData) => {
        return {
            message: ""
        }
    }
}

export const InstituteContext = createContext<InstituteContextType>(defaultInstitute)

export function InstituteContextProvider({ children }: PropsWithChildren) {
    const repo = new InstituteRepositoryHttp()

    async function getAllInstitutes() {
        try {
            const response = await repo.getAllInstitutes()
            return response
        } catch (error: any) {
            return error
        }
    }

    async function getInstituteById(id: string) {
        try {
            const response = await repo.getInstituteById(id)
            return response
        } catch (error: any) {
            return error
        }
    }

    async function createInstitute(data: Institute) {
        try {
            const response = await repo.createInstitute(data)
            return response
        } catch (error: any) {
            return error
        }
    }

    async function deleteInstituteById(id: string) {
        try {
            const response = await repo.deleteInstituteById(id)
            return response
        } catch (error: any) {
            return error
        }
    }

    async function updateInstituteById(data: InstituteProps) {
        try {
            const response = await repo.updateInstituteById(data)
            return response
        } catch (error: any) {
            return error
        }
    }

    async function uploadInstituteImage(data: FormData) {
        try {
            const response = await repo.uploadInstituteImage(data)
            return response
        } catch (error: any) {
            return error
        }
    }

    return (
        <InstituteContext.Provider value={{ getAllInstitutes, getInstituteById, createInstitute, deleteInstituteById, updateInstituteById, uploadInstituteImage }}>
            {children}
        </InstituteContext.Provider>
    )
}


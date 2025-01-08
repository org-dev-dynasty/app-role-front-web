/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, PropsWithChildren } from "react"
import { InstituteRepositoryHttp } from "../api/repositories/institute_repository"
import { InstituteProps } from "../components/updateInstituteModal";

interface Institute {
    institute_id?: string;
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

interface GetAllInstitutesResponse {
    institutes: Institute[]
}

interface GetInstituteByIdResponse {
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

interface CreateInstituteResponse {
    message: string
    id?: string
}

interface DeleteInstituteByIdResponse {
    message: string,
    status?: number
}

interface UpdateInstituteByIdResponse {
    message: string,
    status?: number
}

interface UploadInstituteImageResponse {
    message: string,
    status?: number
}

type InstituteContextType = {
    getAllInstitutes: () => Promise<GetAllInstitutesResponse>
    getInstituteById: (id: string) => Promise<GetInstituteByIdResponse>
    createInstitute: (data: Institute) => Promise<CreateInstituteResponse>
    deleteInstituteById: (id: string) => Promise<DeleteInstituteByIdResponse>
    updateInstituteById: (data: Partial<InstituteProps>) => Promise<UpdateInstituteByIdResponse>
    uploadInstituteImage: (data: FormData) => Promise<UploadInstituteImageResponse>
}


const defaultInstitute = {
    getAllInstitutes: async () => {
        return {
            institutes: []
        }
    },
    getInstituteById: async (_id: string) => {
        return {
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
    },
    createInstitute: async (_data: Institute) => {
        return {
            message: ""
        }
    },
    deleteInstituteById: async (_id: string) => {
        return {
            message: ""
        }
    },
    updateInstituteById: async (_data: Partial<InstituteProps>) => {
        return {
            message: ""
        }
    },
    uploadInstituteImage: async (_data: FormData) => {
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

    async function updateInstituteById(data: Partial<InstituteProps>) {
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


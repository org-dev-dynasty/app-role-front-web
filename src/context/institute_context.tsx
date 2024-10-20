import { createContext, PropsWithChildren } from "react"
import { InstituteRepositoryHttp } from "../api/repositories/institute_repository"

interface Institute {
    institute_id: string;
    name: string;
    description: string;
    institute_type: string;
    phone?: string | undefined;
    logo_photo?: string;
    address?: string | undefined;
    price?: number | undefined;
    district_id?: string | undefined;
    photos_url?: string[] | undefined;
    events_id?: string[] | undefined;
}

type InstituteContextType = {
    getAllInstitutes: () => Promise<object>
    getInstituteById: (id: string) => Promise<object>
    createInstitute?: (data: Institute) => Promise<object>
    deleteInstituteById?: (id: string) => Promise<object>
    updateInstituteById?: (id: string, data: Institute) => Promise<object>
}


const defaultInstitute = {
    getAllInstitutes: async () => {
        return {}
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getInstituteById: async (id: string) => {
        return {}
    },
    createInstitute: async (data: Institute) => {
        return {}
    },
    deleteInstituteById: async (id: string) => {
        return {}
    },
    updateInstituteById: async (id: string, data: Institute) => {
        return {}
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

    async function updateInstituteById(id: string, data: Institute) {
        try {
            const response = await repo.updateInstituteById(id, data)
            return response
        } catch (error: any) {
            return error
        }
    }

    return (
        <InstituteContext.Provider value={{ getAllInstitutes, getInstituteById, createInstitute, deleteInstituteById, updateInstituteById }}>
            {children}
        </InstituteContext.Provider>
    )
}


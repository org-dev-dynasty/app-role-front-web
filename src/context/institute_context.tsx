import { createContext, PropsWithChildren } from "react"
import { InstituteRepositoryHttp } from "../api/repositories/institute_repository"

type InstituteContextType = {
    getAllInstitutes: () => Promise<object>
    getInstituteById: (id: string) => Promise<object>
}

const defaultInstitute = {
    getAllInstitutes: async () => {
        return {}
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getInstituteById: async (id: string) => {
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

    return (
        <InstituteContext.Provider value={{ getAllInstitutes, getInstituteById }}>
            {children}
        </InstituteContext.Provider>
    )
}


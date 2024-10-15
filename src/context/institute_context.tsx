import { createContext, PropsWithChildren } from "react"
import { InstituteRepositoryHttp } from "../api/repositories/institute_repository"

type InstituteContextType = {
    getAllInstitutes: () => Promise<object>
}

const defaultInstitute = {
    getAllInstitutes: async () => {
        return {}
    },
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

    return (
        <InstituteContext.Provider value={{ getAllInstitutes }}>
            {children}
        </InstituteContext.Provider>
    )
}


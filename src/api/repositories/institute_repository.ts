import { httpEvent } from "../http";

export class InstituteRepositoryHttp {
    async getAllInstitutes(){
        try {
            const resp = await httpEvent.get('/get-all-institutes');
            if(resp){
                return resp.data;
            }
        } catch(error: any) {
            throw new Error('Erro ao buscar instituições: ' + error.message)
        }
    }
}
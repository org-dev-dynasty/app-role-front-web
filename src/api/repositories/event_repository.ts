import { httpEvent } from "../http";

export class EventRepositoryHttp {
    async createEvent() {
        try {
            const resp = await httpEvent.post('/create-event', {
              
            });

            if (resp) {
                return resp.data;
            }   
        } catch(error: any) {
            throw new Error('Erro ao criar evento: ' + error.message)
        }
    }
}
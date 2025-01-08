import { GetAllInstitutesResponse } from '@/context/instituteApi/types';
import { httpEvent } from '../http';

export class InstituteRepositoryHttp {
  getAllInstitutes() {
    return httpEvent.get<GetAllInstitutesResponse>('/get-all-institutes');
  }

  getInstituteById(id: string) {
    return httpEvent.get(`/get-institute-by-id?instituteId=${id}`);
  }

  createInstitute(data: any) {
    return httpEvent.post('/create-institute', data);
  }

  deleteInstituteById(id: string) {
    return httpEvent.delete(`/delete-institute-by-id?instituteId=${id}`);
  }

  updateInstituteById(data: any) {
    return httpEvent.put(`/update-institute`, data);
  }

  uploadInstituteImage(data: FormData) {
    return httpEvent.post(`/upload-institute-photo`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

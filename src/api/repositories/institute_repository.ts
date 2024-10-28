import { httpEvent } from "../http";

export class InstituteRepositoryHttp {
  async getAllInstitutes() {
    try {
      const resp = await httpEvent.get("/get-all-institutes");
      if (resp) {
        return resp.data;
      }
    } catch (error: any) {
      throw new Error("Erro ao buscar instituições: " + error.message);
    }
  }

  async getInstituteById(id: string) {
    try {
      const resp = await httpEvent.get(
        `/get-institute-by-id?instituteId=${id}`
      );
      // console.log(resp);
      if (resp) {
        return resp.data;
      }
    } catch (error: any) {
      throw new Error("Erro ao buscar instituição: " + error.message);
    }
  }

  async createInstitute(data: any) {
    try {
      const resp = await httpEvent.post("/create-institute", data);
      if (resp) {
        return resp.data;
      }
    } catch (error: any) {
      throw new Error("Erro ao criar instituição: " + error.message);
    }
  }

  async deleteInstituteById(id: string) {
    try {
      const resp = await httpEvent.delete(
        `/delete-institute-by-id?instituteId=${id}`
      );
      if (resp) {
        return resp.data;
      }
    } catch (error: any) {
      throw new Error("Erro ao deletar instituição: " + error.message);
    }
  }

  async updateInstituteById(data: any) {
    try {
      console.log("before Request: ", data);
      const resp = await httpEvent.put(
        `/update-institute`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resp) {
        return resp.data;
      }
    } catch (error: any) {
      throw new Error("Erro ao atualizar instituição: " + error.message);
    }
  }
  
  async uploadInstituteImage(data: FormData) {
    try {
      const resp = await httpEvent.post(
        `/upload-institute-photo`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (resp) {
        return resp.data;
      }
    } catch (error: any) {
      throw new Error("Erro ao fazer upload da imagem: " + error.message);
    }
  }
}

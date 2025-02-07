import {
  CreateInstituteParams,
  DeleteInstituteParams,
  GetAllInstitutesParams,
  GetInstituteParams,
  Institute,
  UpdateInstituteParams,
} from "@/api/services/instituteService/types";
import { AxiosError } from "axios";
import { InstituteStore } from "./types";
import { GenericUtils } from "@/utils/GenericUtils";
import { instituteService } from "@/config/services";

export const getInstitute =
  (params: GetInstituteParams) => async (store: InstituteStore) => {
    store.institutes.setError(undefined);

    const foundedInstitute = store.institutes.data.find(
      (institute) => institute.instituteId === params.instituteId
    );

    if (foundedInstitute) {
      store.institutes.setSelected(foundedInstitute);

      return { success: true, institute: foundedInstitute } as const;
    }

    store.institutes.setLoading(true);

    try {
      const { data } = await instituteService.getInstitute(params);

      store.institutes.setSelected(data);

      return { success: true, institute: data } as const;
    } catch (error) {
      const err = error as AxiosError<string>;
      store.institutes.setError(err.response?.data);
      return { success: false, message: err.response?.data } as const;
    } finally {
      store.institutes.setLoading(false);
    }
  };

export const getAllInstitutes =
  (params: GetAllInstitutesParams) => async (store: InstituteStore) => {
    store.institutes.setLoading(true);
    store.institutes.setError(undefined);

    try {
      const { data } = await instituteService.getAllInstitutes(params);

      store.institutes.setData(data.items);

      return { success: true, institutes: data };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.institutes.setError(err.response?.data);
      return { success: false, message: err.response?.data };
    } finally {
      store.institutes.setLoading(false);
    }
  };

export const deleteInstitute =
  (params: DeleteInstituteParams) => async (store: InstituteStore) => {
    store.institutes.setLoading(true);
    store.institutes.setError(undefined);

    try {
      await instituteService.deleteInstitute(params);

      store.institutes.setData(
        store.institutes.data.filter(
          (institute) => institute.instituteId !== params.instituteId
        )
      );

      return { success: true };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.institutes.setError(err.response?.data);
      return { success: false, message: err.response?.data };
    } finally {
      store.institutes.setLoading(false);
    }
    ``;
  };

export const getAllInstitutesByPartnerType =
  () => async (store: InstituteStore) => {
    store.institutes.setLoading(true);
    store.institutes.setError(undefined);
  };

export const updateInstitute =
  (institute: UpdateInstituteParams) => async (store: InstituteStore) => {
    store.institutes.setLoading(true);
    store.institutes.setError(undefined);

    try {
      const { data } = await instituteService.updateInstitute(institute);

      store.institutes.setData(
        store.institutes.data.map((inst) =>
          inst.instituteId === data.instituteId ? data : inst
        )
      );

      return { success: true, institute: data };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.institutes.setError(err.response?.data);
      return { success: false, message: err.response?.data };
    } finally {
      store.institutes.setLoading(false);
    }
  };

export const clearSelectedInstitute = () => (store: InstituteStore) => {
  store.institutes.setSelected(undefined);
};

export const createInstitute =
  (params: CreateInstituteParams) => async (store: InstituteStore) => {
    store.institutes.setLoading(true);
    store.institutes.setError(undefined);

    try {
      const institute = new FormData();

      institute.append("name", params.name);
      institute.append("street", params.address.address);
      institute.append("cep", params.address.cep);
      institute.append("longitude", params.address.longitude.toString());
      institute.append("latitude", params.address.latitude.toString());
      institute.append("city", params.address.city);
      institute.append("state", params.address.state);
      institute.append("neighborhood", params.address.neighborhood);
      institute.append("number", params.address.number.toString());
      institute.append("logo", params.logo);
      institute.append("description", params.description);
      institute.append("instituteType", params.instituteType);
      institute.append("partnerType", params.partnerType);
      institute.append("price", params.price.toString());
      institute.append("district", params.district);

      const { data } = await instituteService.createInstitute(institute);

      const logo = await GenericUtils.imageToBase64(params.logo);

      const newInstitute: Institute = {
        instituteId: data.id,
        address: {
          address: params.address.address,
          cep: params.address.cep,
          city: params.address.city,
          neighborhood: params.address.neighborhood,
          number: params.address.number,
          state: params.address.state,
          longitude: params.address.longitude,
          latitude: params.address.latitude,
        },
        district: params.district,
        description: params.description,
        logo: logo,
        phone: params.phone,
        name: params.name,
        partnerType: params.partnerType,
        price: params.price,
        instituteType: params.instituteType,
        photosUrl: [],
        eventsId: [],
      };

      store.institutes.setData([...store.institutes.data, newInstitute]);

      return { success: true, institute: data };
    } catch (error) {
      const err = error as AxiosError<string>;
      store.institutes.setError(err.response?.data);
      return { success: false, message: err.response?.data };
    } finally {
      store.institutes.setLoading(false);
    }
  };

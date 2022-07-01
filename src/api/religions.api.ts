import {instance} from "./api";
import {IReligion} from "../types/religion.type";

export const religionsApi = {
    getAll: async (): Promise<IReligion[]> => {
        const response = await instance.get<IReligion[]>("religions");
        return response.data;
    },
    getById: async (id: string): Promise<IReligion> => {
        const response = await instance.get<IReligion>(`religions/${id}`);
        return response.data;
    },
}
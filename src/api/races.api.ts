import {instance} from "./api";
import {IRace} from "../types/races.types";

export const racesApi = {
    getAll: async (): Promise<IRace[]> => {
        const response = await instance.get<IRace[]>("races");
        return response.data;
    },
    getById: async (id: string): Promise<IRace> => {
        const response = await instance.get<IRace>(`races/${id}`);
        return response.data;
    },
}
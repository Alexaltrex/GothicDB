import {instance} from "./api";
import {ILocation} from "../types/locations.types";

export const locationsApi = {
    getAll: async (): Promise<ILocation[]> => {
        const response = await instance.get<ILocation[]>("locations");
        return response.data;
    },
    getById: async (id: string): Promise<ILocation> => {
        const response = await instance.get<ILocation>(`locations/${id}`);
        return response.data;
    },
}
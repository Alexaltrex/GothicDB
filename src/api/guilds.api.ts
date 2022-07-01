import {instance} from "./api";
import {IGuild} from "../types/guilds.types";

export const guildsApi = {
    getAll: async (): Promise<IGuild[]> => {
        const response = await instance.get<IGuild[]>("guilds");
        return response.data;
    },
    getById: async (id: string): Promise<IGuild> => {
        const response = await instance.get<IGuild>(`guilds/${id}`);
        return response.data;
    },
}
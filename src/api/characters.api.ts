import {ICharacter} from "../types/characters.types";
import {instance} from "./api";

export const charactersApi = {
    getAll: async (): Promise<ICharacter[]> => {
        const response = await instance.get<ICharacter[]>("characters");
        return response.data;
    },
    getById: async (id: string): Promise<ICharacter> => {
        const response = await instance.get<ICharacter>(`characters/${id}`);
        return response.data;
    },
    getList: async (ids: string[]): Promise<ICharacter[]> => {
        const url = ids.join(",");
        const response = await instance.get<ICharacter[]>(`characters/list/${url}`);
        return response.data;
    },
}
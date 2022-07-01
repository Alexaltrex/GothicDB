export interface ICharacter {
    id: string
    name: string
    image: {
        small: string
        large: string
    }
    race: {
        id: string
        name: string
    }
    male: string
    guild: {
        id: string
        name: string
    }
    location: {
        id: string
        name: string
    }
    sublocation?: {
        id: string
        name: string
    }
    role?: string
    religion?: {
        id: string
        name: string
    }
    status: string
    description: string
    code?: string
}

export type SortedByType = 'alphabet' | 'location' | "guild";
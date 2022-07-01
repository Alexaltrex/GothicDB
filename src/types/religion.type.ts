export interface IReligion {
    id: string
    name: string
    img: {
        small: string
        large: string
    }
    memberIds: string[]
    description: string
}
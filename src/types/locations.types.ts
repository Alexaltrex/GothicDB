export interface ILocation {
    id: string
    name: string
    image: {
        small: string
        large: string
    }
    memberIds: Array<string>
    description: string
}
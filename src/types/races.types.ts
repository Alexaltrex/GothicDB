export interface IRace {
    id: string
    name: string
    image: {
        small: string
        large: string
    }
    memberIds: string[]
    description: string
}
export interface IGuild {
    id: string
    name: string
    image: {
        small: string
        large: string
    }
    description: string
    memberIds: string[]
    leaderId?: number
    deploymentId?: string
}


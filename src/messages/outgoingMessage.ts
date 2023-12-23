

export enum SupprotedMEssageTypes {
    AddChat = "ADD_CHAT",
    UpdateChat = "UPDATE_CHAT",
}

export type MessagePayload = {
    roomId: string;
    message: string;
    name: string;
    upvotes: number;

}

export type OutgoingMessage = {
    type: SupprotedMEssageTypes.AddChat,
    payload: MessagePayload
} | {
    type: SupprotedMEssageTypes.UpdateChat,
    payload: MessagePayload
}

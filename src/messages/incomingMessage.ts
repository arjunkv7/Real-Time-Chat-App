import z from 'zod';
import { UserManager } from '../userManager';

const SUPPROTED_MESSAGE_TYPES = ["JOIN_ROOM", "SEND_MESSAGE", "UPVOTE_MESSAGE"]

export enum SupprotedMEssageTypes {
    JoinRoom = "JOIN_ROOM",
    SendMessage = "SEND_MESSAGE",
    UpvoteMessage = "UPVOTE_MESSAGE"
}

export type IncomingMessage = {
    type: SupprotedMEssageTypes.JoinRoom,
    payload: InitMessageType
} | {
    type: SupprotedMEssageTypes.SendMessage,
    payload: UserMessageType
} | {
    type: SupprotedMEssageTypes.UpvoteMessage,
    payload: UpvoteMessageType  
}

export const InitMessage = z.object({
    name: z.string(),
    userId: z.string(),
    roomId: z.string(),

});

export type InitMessageType = z.infer<typeof InitMessage>

const UserMessage = z.object({
    userId: z.string(),
    roomId: z.string(),
    message: z.string()
});

export type UserMessageType = z.infer<typeof UserMessage>

const upvoteMessage = z.object({
    roomId: z.string(),
    userId: z.string(),
    chatId: z.string()
})

export type UpvoteMessageType = z.infer<typeof upvoteMessage>


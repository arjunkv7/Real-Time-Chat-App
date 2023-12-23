export type UserId = string;

export interface Chat {
    id: string
    userId: UserId;
    message: string;
    name: string;
    upvotes: UserId[];
}


export abstract class Store {
    constructor() {

    }

    initRoom(roomId: string) {

    }

    getChats(roomId: string, limit: number, offset: number) {

    }

    addChat(userId:UserId, message: string, name: string, room: string) {

    }

    upvote(userId:UserId, roomId: string, chatId: string) {

    }
}
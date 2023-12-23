import { Store, Chat, UserId } from "./Store";
let chatNo = 0;

interface Room {
    roomId: string,
    chats: Chat[]
}

export class InMemoreStore implements Store {
    private store: Map<string, Room>

    constructor() {
        this.store = new Map<string, Room>()
    }

    initRoom(roomId: string) {
        this.store.set(roomId, {
            roomId,
            chats: []
        });
    }

    getChats(roomId: string, limit: number, offset: number) {
        let room = this.store.get(roomId);
        if (!room) {
            return []
        }
        return room.chats.reverse().slice(0, offset).slice(-1 * limit)
    }

    addChat(userId: UserId, message: string, name: string, roomId: string) {
        let room = this.store.get(roomId);
        if (!room) {
            return
        }
        room.chats.push({
            id: (chatNo++).toString(),
            userId: userId,
            message: message,
            name: name,
            upvotes: []
        })

    }

    upvote(userId:UserId, roomId: string, chatId: string) {
        let room = this.store.get(roomId);
        if (!room) {
            return
        }
        const chat = room.chats.find(e => e.id == chatId)
        chat?.upvotes.push(userId);
    }
}
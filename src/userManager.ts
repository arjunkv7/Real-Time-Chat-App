import { connection } from "websocket";

export interface User {
    id: string;
    name: string;
    connection: connection
}

export interface Room {
    users: User[]
}

export class UserManager {
    private rooms: Map<string, Room>
    constructor() {
        this.rooms = new Map<string, Room>()
    }

    addUser(userId: string, roomId: string, name: string, socket: connection) {
        if (!this.rooms.get(roomId)) {
            this.rooms.set(roomId, {
                users: []
            });
        }

        this.rooms.get(roomId)?.users.push({
            id: userId,
            name: name,
            connection: socket
        });
    }

    removeUser(userId: string, roomId: string) {
        let room = this.rooms.get(roomId);
        if (room) {
            room.users = room.users.filter(e => e.id !== userId)
        }
    }

    getUser(userId: string, roomId: string) {
        let room = this.rooms.get(roomId);
        if (!room) return null
        let user = room.users.find(e => e.id == userId);
        return user ?? null
    }

    broadcast(roomId: string, userId: string, message: string) {
        const user = this.getUser(userId, roomId);
        if (!user) {
            console.log('User not found');
            return
        }
        const room = this.rooms.get(roomId);
        if (!room) {
            console.log("Room not found");
            return
        } 
    }
}
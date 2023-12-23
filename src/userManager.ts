export interface User {
    id: string;
    name: string
}

export interface Room {
    users: User[]
}

export class UserManager {
    private rooms: Map<string, Room>
    constructor() {
        this.rooms = new Map<string, Room>()
    }

    addUser(userId: string, roomId: string, name: string) {
        if (!this.rooms.get(roomId)) {
            this.rooms.set(roomId, {
                users: []
            });
        }

        this.rooms.get(roomId)?.users.push({
            id: userId,
            name: name
        });
    }

    removeUser(userId: string, roomId: string) {
        let room = this.rooms.get(roomId);
        if (room) {
            room.users = room.users.filter(e => e.id !== userId)
        }
    }
}
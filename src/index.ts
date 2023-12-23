import { connection, server } from 'websocket';
import http from "http";
import { IncomingMessage, SupprotedMEssageTypes } from './messages/incomingMessage';
import { InMemoreStore } from './store/inMemoryStore';
import { UserManager } from './userManager';

var httpServer = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

httpServer.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

const Store = new InMemoreStore();
const userManager = new UserManager();

let wsServer = new server({
    httpServer: httpServer,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin: string) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            try {
                messageHandler(connection, JSON.parse(message.utf8Data))
            } catch (e) {

            }

            // console.log('Received Message: ' + message.utf8Data);
            // connection.sendUTF(message.utf8Data);
        }

    });
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

function messageHandler(ws: connection, message: IncomingMessage,) {
    if (message.type == SupprotedMEssageTypes.JoinRoom) {
        const payload = message.payload;
        userManager.addUser(payload.userId, payload.roomId, payload.name, ws)
    }
    if (message.type == SupprotedMEssageTypes.SendMessage) {
        const payload = message.payload;
        let user = userManager.getUser(payload.userId, payload.roomId);
        if (!user) {
            console.log('User not found');
            return
        }
        Store.addChat(payload.userId, payload.message, user.name, payload.roomId);

        //To do add bradcasat message

    }

}
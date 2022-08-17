import { Server as SocketServer } from "socket.io"

export default (server) => {
   let inicialized = new SocketServer(server, {
        cors: {
            origin: 'http://localhost:3000'
        }
    })

    return inicialized;

}


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
exports.default = (server) => {
    let inicialized = new socket_io_1.Server(server, {
        cors: {
            origin: 'http://localhost:3000'
        }
    });
    return inicialized;
};

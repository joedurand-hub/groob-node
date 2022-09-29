"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const feed_routes_1 = __importDefault(require("./routes/feed.routes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const search_routes_1 = __importDefault(require("./routes/search.routes"));
const follow_routes_1 = __importDefault(require("./routes/follow.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const messages_routes_1 = __importDefault(require("./routes/messages.routes"));
const socket_io_1 = require("socket.io");
// Inicialization
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// export instance for new sockets in endpoints
let io = new socket_io_1.Server(server, {
    cors: {
        origin: ['https://groob.vercel.app', 'http://groob.com.ar',
            'http://www.groob.com.ar', 'https://groob.com.ar', 'https://www.groob.com.ar',
            'http://localhost:3000'],
        optionsSuccessStatus: 200,
        credentials: true,
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Content-Type',
            'Access-Control-Allow-Origin',
            'Accept',
            'X-Access-Token',
            'AuthToken'
        ],
    }
});
const errorHandler = (err, req, res, next) => { };
app.use(errorHandler);
// Settings
app.set('port', process.env.PORT || 8080);
// Middlewares
app.use((0, morgan_1.default)('dev'));
var corsOptions = {
    origin: 'https://www.groob.com.ar',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Access-Control-Allow-Origin',
        'Accept',
        'X-Access-Token',
        'AuthToken'
    ],
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, cookie_parser_1.default)());
app.enable('trust proxy');
app.use(express_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use(express_1.default.json({ limit: "50mb" }));
// Routes
app.use(auth_routes_1.default);
app.use(profile_routes_1.default);
app.use(feed_routes_1.default);
app.use(search_routes_1.default);
app.use(follow_routes_1.default);
app.use(chat_routes_1.default);
app.use(messages_routes_1.default);
// Static files
app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
let activeUsers = [{ userId: '', socketId: '' }];
io.on("connection", (socket) => {
    socket.on("newUserAdded", (newUserId) => {
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            });
        }
        io.emit("getUsers", activeUsers); // send the users active
    });
    socket.on("newMessage", (data) => {
        if (data) {
            console.log("1- data:", data);
            const user = activeUsers.find((user) => user.userId === data.reciverId);
            if (user) {
                console.log("2- user: ", user);
                // io.to(user.socketId).emit("reciveMessage", data.newSocketMessage);
                io.emit("receiveMessage", data.newSocketMessage);
            }
        }
    });
    socket.on("disconnected", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("user disconnected", activeUsers);
        io.emit("getUsers", activeUsers);
    });
});
exports.default = server;

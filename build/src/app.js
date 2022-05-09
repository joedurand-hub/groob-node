"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const feed_routes_1 = __importDefault(require("./routes/feed.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// Inicialization
const app = (0, express_1.default)();
// Settings
app.set('port', process.env.PORT || 8080);
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
// var corsOptions = {
//     origin: '*', // Aqui debemos reemplazar el * por el dominio de nuestro front
//     optionsSuccessStatus: 200 // Es necesario para navegadores antiguos o algunos SmartTVs
// }
// app.use(cors(corsOptions));
// Routes
app.use(profile_routes_1.default);
app.use(feed_routes_1.default);
app.use(auth_routes_1.default);
// Static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
exports.default = app;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findChat = exports.userChats = exports.createChat = void 0;
const constants_1 = require("./../../libs/constants");
const Chat_1 = __importDefault(require("../../models/Chat"));
const User_1 = __importDefault(require("../../models/User"));
const createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId);
        const chat = yield Chat_1.default.findOne({
            members: { $all: [req.userId, req.body.recivedId] }
        });
        if (chat !== undefined && chat !== null) {
            res.status(200).json({ message: "el chat ya existe boludín:", chat });
            return constants_1.closeConnectionInMongoose;
        }
        else {
            const newChat = new Chat_1.default({ members: [req.body.senderId, req.body.recivedId] });
            const result = yield newChat.save();
            const chatId = result === null || result === void 0 ? void 0 : result._id;
            if (user != undefined)
                user.chats = user.chats.concat(chatId);
            yield user.save();
            res.status(200).json(result);
            return constants_1.closeConnectionInMongoose;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.createChat = createChat;
const userChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_1.default.findById(req.userId);
        const chats = yield Chat_1.default.find({
            members: { $in: [req.userId] }
        });
        const userName = user === null || user === void 0 ? void 0 : user.userName;
        const online = user === null || user === void 0 ? void 0 : user.online;
        const profilePicture = (_a = user === null || user === void 0 ? void 0 : user.profilePicture) === null || _a === void 0 ? void 0 : _a.secure_url;
        const myId = user._id.toString();
        const usersInMyChat = chats.map(obj => obj.members).flat();
        const usersId = usersInMyChat.filter(member => member !== myId);
        const allMyChats = yield User_1.default.find({
            _id: {
                $in: usersId
            }
        });
        const chatIdAndUserId = chats.map(user => {
            return {
                id: user._id.toString(),
                member: user.members,
            };
        });
        const usersDataInTheChat = allMyChats.map(user => {
            return {
                id: user._id.toString(),
                userName: user.userName,
                profilePicture: user.profilePicture.secure_url,
                online: user.online,
                updatedAt: user.updatedAt,
            };
        });
        res.status(200).json({ chatIdAndUserId, usersDataInTheChat, userName, profilePicture, online, myId });
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.userChats = userChats;
const findChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const myId = (_b = req.userId) === null || _b === void 0 ? void 0 : _b.toString();
        const chat = yield Chat_1.default.findOne({
            members: { $all: [req.userId, req.params.secondId] }
        });
        const user = yield User_1.default.findById(req.params.secondId);
        const userName = user === null || user === void 0 ? void 0 : user.userName;
        const profilePicture = (_c = user === null || user === void 0 ? void 0 : user.profilePicture) === null || _c === void 0 ? void 0 : _c.secure_url;
        const online = user === null || user === void 0 ? void 0 : user.online;
        constants_1.closeConnectionInMongoose;
        res.status(200).json({ chat, userName, profilePicture, online, myId });
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.findChat = findChat;

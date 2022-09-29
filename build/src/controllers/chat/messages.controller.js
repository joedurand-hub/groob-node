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
exports.getMessages = exports.addMessage = void 0;
const Message_1 = __importDefault(require("../../models/Message"));
const Chat_1 = __importDefault(require("../../models/Chat"));
const constants_1 = require("../../libs/constants");
const addMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chatId, senderId, text } = req.body;
        const newMessage = new Message_1.default({ chatId, senderId, text });
        const result = yield newMessage.save();
        const chat = yield Chat_1.default.findById(chatId);
        if (chat !== undefined) {
            chat.messages = chat.messages.concat(text);
        }
        yield chat.save();
        constants_1.closeConnectionInMongoose;
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});
exports.addMessage = addMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const myId = (_a = req.userId) === null || _a === void 0 ? void 0 : _a.toString();
        const { chatId } = req.params;
        const chat = yield Message_1.default.find({ chatId });
        constants_1.closeConnectionInMongoose;
        res.status(200).json({ chat, myId });
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.getMessages = getMessages;

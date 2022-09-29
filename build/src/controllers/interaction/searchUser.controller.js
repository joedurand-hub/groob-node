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
exports.searchUser = void 0;
const User_1 = __importDefault(require("../../models/User"));
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { input } = req.query;
        console.log(input);
        if (input === undefined || input === null || input === "")
            return;
        else {
            let data = yield User_1.default.find();
            const result = data.filter(user => {
                if (user.userName.toLowerCase().includes(input)
                    || user.description.toLowerCase().includes(input)
                    || user.firstName.toLowerCase().includes(input)
                    || user.lastName.toLowerCase().includes(input)
                    || user.email.toLowerCase().includes(input)) {
                    return user;
                }
            });
            return res.status(200).json(result);
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.searchUser = searchUser;

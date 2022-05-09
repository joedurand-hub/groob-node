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
exports.reset = exports.login = exports.signup = void 0;
// import mongoose from "mongoose";
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const user = new User_1.default({ username, password, email });
    user.password = yield user.encryptPassword(user.password);
    const userSaved = yield user.save();
    const token = jsonwebtoken_1.default.sign({ _id: userSaved._id }, `${process.env.TOKEN_KEY_JWT}`);
    // mongoose.connection.close()
    res.header("auth-token", token).json(userSaved);
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user)
        return res.status(400).json('Email or password is wrong');
    const passwordFromLogin = yield user.validatePassword(password);
    if (!passwordFromLogin)
        return res.status(400).json('Email or password is wrong');
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, `${process.env.TOKEN_KEY_JWT}`, {
        expiresIn: 604800
    });
    // mongoose.connection.close()
    console.log("token", token);
    return res.header('auth-token', token).json(user);
});
exports.login = login;
const reset = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Actualizando Post');
});
exports.reset = reset;

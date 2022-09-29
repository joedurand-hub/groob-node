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
exports.logout = exports.login = exports.signup = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const closeConnectionInMongoose = mongoose_1.default.connection.close();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password, email } = req.body;
        const userNameExist = yield User_1.default.findOne({ userName });
        if (userNameExist) {
            return res.json("The username is already in use.");
        }
        const emailExist = yield User_1.default.findOne({ email });
        if (emailExist) {
            return res.json("The email is already in use.");
        }
        else {
            if (password.length >= 6 && password.length < 16) {
                const user = new User_1.default({ userName, password, email });
                user.password = yield user.encryptPassword(user.password);
                user.profilePicture.secure_url = "https://res.cloudinary.com/groob/image/upload/v1661108370/istoremovebg-preview_hzebg1.png";
                const userSaved = yield user.save();
                const token = jsonwebtoken_1.default.sign({ _id: userSaved._id }, `${process.env.TOKEN_KEY_JWT}`, {
                    expiresIn: 1204800
                });
                user.online = true;
                yield user.save();
                res.cookie('authToken', token, {
                    httpOnly: true,
                    secure: true,
                });
                res.status(200).json({ message: 'Success' });
            }
            return closeConnectionInMongoose;
        }
    }
    catch (error) {
        console.log("error:", error);
        res.status(400).json(error);
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, userName, password } = req.body;
        if (email !== undefined && email.length > 0 && password.length > 0) {
            const user = yield User_1.default.findOne({ email });
            const passwordFromLogin = yield user.validatePassword(password);
            if (!passwordFromLogin)
                return res.status(400).json('Email or password is wrong');
            user.online = true;
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, `${process.env.TOKEN_KEY_JWT}`, {
                expiresIn: 604800
            });
            res.cookie('authToken', token, {
                maxAge: 900000,
                httpOnly: true,
                secure: true,
                sameSite: 'none', // No se enviará en peticiones cross-site, evita ataques CSRF
            });
            res.status(200).json({ message: 'Success' });
            yield user.save();
            return closeConnectionInMongoose;
        }
        if (userName !== undefined && userName.length > 0 && password.length > 0) {
            const user = yield User_1.default.findOne({ userName });
            const passwordFromLogin = yield user.validatePassword(password);
            if (!passwordFromLogin)
                return res.status(400).json('Email or password is wrong');
            user.online = true;
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, `${process.env.TOKEN_KEY_JWT}`, {
                expiresIn: 604800
            });
            res.cookie('authToken', token, {
                maxAge: 604800,
                httpOnly: true,
                secure: true,
                sameSite: true, // No se enviará en peticiones cross-site, evita ataques CSRF
            });
            res.status(200).json({ message: 'Success' });
            yield user.save();
            return closeConnectionInMongoose;
        }
        return closeConnectionInMongoose;
    }
    catch (error) {
        console.log("error:", error);
        res.status(400).json(error);
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId);
        user.online = false;
        yield user.save();
        res.clearCookie('authToken');
        res.send('Cookie deleted');
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.logout = logout;
// export const reset_password = async (_req: Request, res: Response) => {
//     const { email, userName } = req.body
//     return {
//         from: 'henry.nftmarket@gmail.com',
//         to: email,
//         subject: `Password Reset Request`,
//         text: `Hello, ${userName}. We've received a password reset request from this email address. Below we'll provide you a special link that will help you change your password. Please note that for security reasons this link will expire after 24 hours. http://localhost:3000/reset/${req.userId}`,
//     }
// }

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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        min: 3,
        maxlength: 16,
        requiered: true,
        lowercase: true,
        unique: true,
    },
    email: {
        type: String,
        requiered: [true, 'Please enter an email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        requiered: [true, 'Please enter a password'],
        minlength: 6
    },
    birthday: {
        type: Date,
        default: new Date()
    },
    firstName: { type: String, default: "", lowercase: true, },
    lastName: { type: String, default: "", lowercase: true, },
    description: { type: String, default: "", lowercase: true, },
    profilePicture: {
        public_id: String,
        secure_url: String
    },
    gender: { type: String, default: "Other" },
    verified: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
    premium: { type: Boolean, default: false },
    visits: { type: [String] },
    explicitContent: { type: Boolean, default: false },
    followers: { type: [String], default: [], trim: true },
    followings: { type: [String], default: [], trim: true },
    likes: { type: [String] },
    publications: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Publication",
        },
        { timestamps: true, versionKey: false },
    ],
    cryptoWallets: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Crypto",
        },
        { timestamps: true, versionKey: false }
    ],
    fiatWallets: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Fiat",
        },
        { timestamps: true, versionKey: false },
    ],
    chats: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Chat",
        }],
}, { timestamps: true, versionKey: false });
userSchema.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};
userSchema.methods.encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcryptjs_1.default.genSalt(10);
    return bcryptjs_1.default.hash(password, salt);
});
userSchema.methods.validatePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
exports.default = (0, mongoose_1.model)('User', userSchema);

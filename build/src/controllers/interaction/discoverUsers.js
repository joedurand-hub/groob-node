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
exports.discoverUsers = void 0;
const Publication_1 = __importDefault(require("../../models/Publication"));
const User_1 = __importDefault(require("../../models/User"));
const constants_1 = require("../../libs/constants");
const discoverUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId);
        const allPublications = yield Publication_1.default.find();
        if (user.explicitContent === true) {
            const filterByPhoto = allPublications.filter(post => {
                if (post.images.length > 0) {
                    return post;
                }
            });
            const orderByDate = filterByPhoto.sort((a, b) => {
                if (a.createdAt < b.createdAt)
                    return 1;
                return -1;
            });
            res.status(200).json(orderByDate);
        }
        else {
            const filterByExplicitContentAndImages = allPublications.filter(post => post.explicitContent === false && post.images.length > 0);
            const orderByDate = filterByExplicitContentAndImages.sort((a, b) => {
                if (a.createdAt < b.createdAt)
                    return 1;
                return -1;
            });
            res.status(200).json(orderByDate);
        }
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log(error);
    }
});
exports.discoverUsers = discoverUsers;

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
exports.getAllPostsByFollowings = void 0;
const User_1 = __importDefault(require("../../models/User"));
const Publication_1 = __importDefault(require("../../models/Publication"));
const constants_1 = require("../../libs/constants");
const getAllPostsByFollowings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUser = yield User_1.default.findById(req.userId, { password: 0, followers: 0, firstName: 0, lastName: 0, birthday: 0, createdAt: 0, updatedAt: 0, email: 0 });
        // traigo mi usuario y busco los id de mis publicaciones
        let myPosts = myUser.publications.map((id) => id);
        // busco mis publicaciones en el modelo
        const postsByMyUser = yield Publication_1.default.find({
            _id: {
                $in: myPosts
            }
        });
        let allMyIds = myUser.followings.map((id) => id);
        // busco las publicaciones de quienes sigo
        const postsByFollowings = yield Publication_1.default.find({
            user: {
                $in: allMyIds
            }
        });
        // No implementado
        let usersByPosts = yield User_1.default.find({
            user: {
                $in: allMyIds
            }
        }, { password: 0, followers: 0, firstName: 0, lastName: 0, birthday: 0, createdAt: 0, updatedAt: 0, email: 0 });
        // console.log(usersByPosts) // obtengo cada usuario que sigo
        // Implementar en unir cada post con los datos del usuario correspondiente
        if (myUser.explicitContent === true) {
            const allPosts = postsByMyUser.concat(postsByFollowings); // concateno los usuarios y los posts
            const data = allPosts.sort((a, b) => {
                if (a.createdAt < b.createdAt)
                    return 1;
                return -1;
            });
            res.status(200).json({ data, myId: myUser === null || myUser === void 0 ? void 0 : myUser._id });
        }
        else {
            const postWithOutExplicitContent = postsByFollowings.filter(post => post.explicitContent === false);
            const allPosts = postsByMyUser.concat(postWithOutExplicitContent); // concateno los usuarios y los posts
            const data = allPosts.sort((a, b) => {
                if (a.createdAt < b.createdAt)
                    return 1;
                return -1;
            });
            res.status(200).json({ data, myId: myUser === null || myUser === void 0 ? void 0 : myUser._id });
        }
        constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.getAllPostsByFollowings = getAllPostsByFollowings;

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
exports.getAllPostsByUser = exports.deleteProfile = exports.pictureProfile = exports.updateProfile = exports.getProfileById = exports.getAllProfiles = exports.getReducedUserById = exports.getReducedUser = exports.getProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const Publication_1 = __importDefault(require("../models/Publication"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const cloudinary_1 = require("../libs/cloudinary");
// import {  deleteImage } from "../libs/cloudinary";
const constants_1 = require("../libs/constants");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileData = yield User_1.default.findById(req.userId, { password: 0 }).populate({
            path: 'publications',
            select: 'publications',
            options: { limit: 10 }
        });
        res.status(200).json(profileData);
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log("Cannot get profile", error);
        return res.status(404).json(error);
    }
});
exports.getProfile = getProfile;
const getReducedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUser = yield User_1.default.findById(req.userId, { password: 0, followers: 0, followings: 0, publications: 0, description: 0, firstName: 0, lastName: 0, birthday: 0, createdAt: 0, updatedAt: 0, email: 0 });
        res.status(200).json(myUser);
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log("Cannot get profile", error);
        return res.status(404).json(error);
    }
});
exports.getReducedUser = getReducedUser;
const getReducedUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id, { password: 0, followers: 0, followings: 0, publications: 0, description: 0, firstName: 0, lastName: 0, birthday: 0, createdAt: 0, updatedAt: 0, email: 0 });
        res.status(200).json(user);
    }
    catch (error) {
        console.log("Cannot get profile", error);
        return res.status(404).json(error);
    }
});
exports.getReducedUserById = getReducedUserById;
const getAllProfiles = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProfiles = yield User_1.default.find();
        res.status(200).json(allProfiles);
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log(error);
        res.status(500).send('An internal server error occurred');
    }
});
exports.getAllProfiles = getAllProfiles;
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const profileData = yield User_1.default.findById(id, { password: 0 });
        const myId = (_a = req.userId) === null || _a === void 0 ? void 0 : _a.toString();
        if (profileData !== undefined) {
            profileData.visits = profileData.visits.concat(myId);
        }
        yield profileData.save();
        res.status(200).json({ profileData, myId });
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log("Cannot get profile", error);
        return res.status(404).json(error);
    }
});
exports.getProfileById = getProfileById;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, description, age, firstName, lastName, online, premium, verified, explicitContent } = req.body;
        const { id } = req.params;
        const user = yield User_1.default.findById(id, { password: 0 });
        const userUpdated = yield User_1.default.findOneAndUpdate({ _id: user._id }, { userName, description, age, firstName, lastName, explicitContent });
        res.status(200).json({ message: "User updated!", userUpdated });
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log("Error:", error);
        res.status(500).json(error);
    }
});
exports.updateProfile = updateProfile;
const pictureProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id, { password: 0 });
        let obj = {};
        if (req.files) {
            const files = req.files['image'];
            if (files) {
                for (const file of files) {
                    const result = yield (0, cloudinary_1.uploadImage)({ filePath: file.path });
                    obj = {
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    };
                    yield fs_extra_1.default.unlink(file.path);
                }
            }
        }
        if (user !== undefined) {
            user.profilePicture = obj;
            const userUpdated = yield user.save();
            const pictureUpdated = userUpdated.profilePicture;
            res.status(200).json({ pictureUpdated });
        }
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log("Error:", error);
        res.status(500).json(error);
    }
});
exports.pictureProfile = pictureProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const myUser = yield User_1.default.findById({ _id: id });
        console.log(myUser);
        const allPostsToDelete = myUser.publications.map(id => id);
        const allPosts = yield Publication_1.default.find({
            _id: {
                $in: allPostsToDelete
            }
        });
        const postsDeleted = yield Publication_1.default.deleteMany({ _id: allPosts });
        const userDeleted = yield User_1.default.deleteOne({ myUser });
        res.status(200).json({ message: `User and posts deleted`, postsDeleted, userDeleted });
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
exports.deleteProfile = deleteProfile;
const getAllPostsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Hacer paginado cada 7 posts así en el front se realiza infinity scroll
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id);
        const posts = yield Publication_1.default.find();
        const userId = user._id.toString();
        const postsByUser = posts.filter(post => {
            if (userId === post.user.toString()) {
                return post;
            }
        });
        const data = postsByUser.sort((a, b) => {
            if (a.createdAt < b.createdAt)
                return 1;
            return -1;
        });
        res.status(200).json(data);
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log(error);
        res.status(500).send('An internal server error occurred');
    }
});
exports.getAllPostsByUser = getAllPostsByUser;

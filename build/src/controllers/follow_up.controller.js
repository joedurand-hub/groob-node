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
exports.getFollowings = exports.getFollowers = exports.unfollow = exports.follow = void 0;
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const closeConnectionInMongoose = mongoose_1.default.connection.close();
const follow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { followTo } = req.body;
        const myUser = yield User_1.default.findById(req.userId);
        if (myUser != undefined) {
            myUser.followings = myUser.followings.concat(followTo);
        }
        yield myUser.save();
        const userWithNewFollower = yield User_1.default.findById(followTo);
        if (userWithNewFollower != undefined) {
            userWithNewFollower.followers = userWithNewFollower.followers.concat(myUser === null || myUser === void 0 ? void 0 : myUser._id);
        }
        yield userWithNewFollower.save();
        closeConnectionInMongoose;
        res.json(true);
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.follow = follow;
const unfollow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idOfTheUserToUnfollow } = req.body;
        const otherUser = yield User_1.default.findById(idOfTheUserToUnfollow);
        const myUser = yield User_1.default.findById(req.userId);
        if (myUser) {
            myUser.followings = myUser.followings.filter((id) => id !== idOfTheUserToUnfollow);
        }
        yield myUser.save();
        const idUser = myUser._id;
        if (otherUser) {
            otherUser.followers = otherUser.followers.filter((id) => id !== idUser.toString());
        }
        yield otherUser.save();
        res.json(true);
        closeConnectionInMongoose;
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.unfollow = unfollow;
const getFollowers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUser = yield User_1.default.findById(req.userId);
        if (myUser !== undefined) {
            let allMyIds = myUser.followers.map((id) => id);
            const result = yield User_1.default.find({
                _id: {
                    $in: allMyIds
                }
            });
            const followersData = result.map(obj => {
                return {
                    username: obj.userName,
                    picture: obj.profilePicture,
                    id: obj._id.toString()
                };
            });
            res.json({ followersData });
            closeConnectionInMongoose;
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.getFollowers = getFollowers;
const getFollowings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUser = yield User_1.default.findById(req.userId);
        if (myUser !== undefined) {
            let allMyIds = myUser.followings.map((id) => id);
            const result = yield User_1.default.find({
                _id: {
                    $in: allMyIds
                }
            });
            const followingsData = result.map(obj => {
                return {
                    username: obj.userName,
                    picture: obj.profilePicture,
                    id: obj._id.toString()
                };
            });
            res.json({ followingsData });
            closeConnectionInMongoose;
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});
exports.getFollowings = getFollowings;

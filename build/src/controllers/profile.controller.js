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
exports.deleteProfile = exports.updateProfile = exports.getProfile = exports.getRcommendedUsersByPublicationsOnTheMoment = void 0;
const User_1 = __importDefault(require("../models/User"));
const Publication_1 = __importDefault(require("../models/Publication"));
const getRcommendedUsersByPublicationsOnTheMoment = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield User_1.default.find();
    const allPublications = yield Publication_1.default.find();
    const recomended = [allUsers.concat(allPublications)].flat();
    try {
        console.log("recomended:", recomended);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getRcommendedUsersByPublicationsOnTheMoment = getRcommendedUsersByPublicationsOnTheMoment;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileData = yield User_1.default.findById(req.userId, { password: 0 }).populate({
            path: 'publications',
            select: 'publications',
            options: { limit: 10 }
        });
        console.log("profile:", profileData);
        return res.status(200).json(profileData);
    }
    catch (error) {
        console.log("No se pudo traer el perfil", error);
        return res.status(404).json(error);
    }
});
exports.getProfile = getProfile;
const updateProfile = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { artist, description, profilePic, address} = req.body;
    // let profileUser = await User.findOne({token})
    // profileUser.artist = artist;
    // profileUser.description = description;
    // profileUser.profilePic = profilePic;
    // profileUser.address= address;
    // await profileUser.save();
    // res.json(profileUser);
});
exports.updateProfile = updateProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.deleteOne({ _id: id });
        console.log("user eliminado", user);
        res.status(200).json(`Eliminando el usuario ${user}`);
    }
    catch (error) {
        res.status(500).json("algo salió mal");
        console.log(error);
    }
});
exports.deleteProfile = deleteProfile;

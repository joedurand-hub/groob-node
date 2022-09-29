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
exports.dislikePost = exports.likePost = exports.commentPost = exports.deletePost = exports.getPostById = exports.createPost = void 0;
const Publication_1 = __importDefault(require("../models/Publication"));
const User_1 = __importDefault(require("../models/User"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const cloudinary_1 = require("../libs/cloudinary");
const constants_1 = require("../libs/constants");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, price, explicitContent } = req.body;
        const priceValue = parseInt(price);
        const myBoolean = explicitContent === 'true';
        const user = yield User_1.default.findById(req.userId, { password: 0 });
        if (!user)
            return res.status(404).json("No user found");
        const publication = new Publication_1.default({
            content, price: priceValue, explicitContent: myBoolean, user: user === null || user === void 0 ? void 0 : user._id, userName: user === null || user === void 0 ? void 0 : user.userName,
            profilePicture: user === null || user === void 0 ? void 0 : user.profilePicture.secure_url
        });
        if (req.files) {
            const files = req.files['images'];
            const data = [];
            if (files) {
                for (const file of files) {
                    const result = yield (0, cloudinary_1.uploadImage)({ filePath: file.path });
                    data.push({ public_id: result.public_id, secure_url: result.secure_url });
                    yield fs_extra_1.default.unlink(file.path);
                }
            }
            publication.images = data;
        }
        const publicationSaved = yield publication.save();
        const postIdForTheUser = publicationSaved === null || publicationSaved === void 0 ? void 0 : publicationSaved._id;
        if (user != undefined)
            user.publications = user.publications.concat(postIdForTheUser);
        yield user.save();
        res.status(201).json({ "success": true, publicationSaved });
        constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log(error);
        res.status(400).send("Mandaste cualquier cosa");
    }
});
exports.createPost = createPost;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield Publication_1.default.findById({ _id: id });
        res.status(200).json(post);
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log(error);
        res.status(500).send('An internal server error occurred');
    }
});
exports.getPostById = getPostById;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const post = yield Publication_1.default.findById(id);
        if (!post) {
            return res.status(404).json({ message: "No se ha encontrado la publicación" });
        }
        const postInUser = yield User_1.default.findById({ _id: req.userId });
        yield Publication_1.default.deleteOne({ _id: id });
        if ((_a = post.image) === null || _a === void 0 ? void 0 : _a.public_id) {
            yield (0, cloudinary_1.deleteImage)(post.image.public_id);
        }
        if (postInUser !== undefined) {
            postInUser.publications = postInUser.publications.filter(postId => id.toString() !== postId);
        }
        yield postInUser.save();
        res.status(200).json(`Publicación eliminada`);
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        res.status(500).send('An internal server error occurred');
        console.log(error);
    }
});
exports.deletePost = deletePost;
const commentPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { value } = req.body;
        if (value === undefined)
            res.status(400).json("El comentario no puede estar vacío");
        if (value.length > 500)
            res.status(400).json("El comentario no puede superar los 500 caracteres");
        const post = yield Publication_1.default.findById({ _id: id });
        post.comments.push(value);
        const updatedPost = yield Publication_1.default.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log(error);
        res.status(500).send('An internal server error occurred');
    }
});
exports.commentPost = commentPost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { idPostLiked } = req.body;
        console.log(idPostLiked);
        const post = yield Publication_1.default.findById({ _id: id });
        const updatedPost = yield Publication_1.default.findByIdAndUpdate(id, { likes: post.likes + 1 }, { new: true });
        res.status(200).json(updatedPost.likes);
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log(error);
        res.status(500).send('An internal server error occurred');
    }
});
exports.likePost = likePost;
const dislikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const post = yield Publication_1.default.findById({ _id: id });
        const updatedPost = yield Publication_1.default.findByIdAndUpdate(id, { likes: post.likes - 1 }, { new: true });
        res.status(200).json(updatedPost);
        return constants_1.closeConnectionInMongoose;
    }
    catch (error) {
        console.log(error);
        res.status(500).send('An internal server error occurred');
    }
});
exports.dislikePost = dislikePost;

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
exports.updatePost = exports.deletePost = exports.searchPost = exports.getPostById = exports.getAllPostsAndUsers = exports.createPost = void 0;
const Publication_1 = __importDefault(require("../models/Publication"));
const User_1 = __importDefault(require("../models/User"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.body;
        const user = yield User_1.default.findById(req.userId);
        if (!user)
            return res.status(404).json("No user found");
        const publication = new Publication_1.default({ content, user: user === null || user === void 0 ? void 0 : user._id });
        const publicationSaved = yield publication.save();
        const postIdForTheUser = publicationSaved === null || publicationSaved === void 0 ? void 0 : publicationSaved._id;
        if (user != undefined) {
            user.publications = user.publications.concat(postIdForTheUser);
        }
        yield user.save();
        res.status(201).json(publicationSaved);
    }
    catch (error) {
        console.log(error);
        res.status(400).send("Mandaste cualquier cosa amigo");
    }
});
exports.createPost = createPost;
const getAllPostsAndUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield User_1.default.find();
        const allPublications = yield Publication_1.default.find();
        const postsInFeed = [allUsers.concat(allPublications)].flat();
        res.send(postsInFeed);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('An internal server error occurred');
    }
});
exports.getAllPostsAndUsers = getAllPostsAndUsers;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(id);
    try {
        const post = yield Publication_1.default.findById({ _id: id });
        console.log("post:", post);
        res.send(post);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('An internal server error occurred');
    }
});
exports.getPostById = getPostById;
const searchPost = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let allPublications = yield Publication_1.default.find();
        console.log("todos los post", allPublications);
        // const result = allPublications.filter((publication:string) => {
        //     if (publication?.content && publication?.content.toLowerCase().includes(content.toLowerCase())) {
        //         return publication
        //     }
        // })
        // console.log(result) 
        // return res.status(200).json(result)
    }
    catch (error) {
        console.log(error);
    }
});
exports.searchPost = searchPost;
const deletePost = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    // const 
    // const nftDb = await Product.findByIdAndDelete({ _id: id })
    // res.json('Eliminando Post')
});
exports.deletePost = deletePost;
const updatePost = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Actualizando Post');
});
exports.updatePost = updatePost;

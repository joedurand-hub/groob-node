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
exports.updatePost = exports.deletePost = exports.getPost = exports.getAllPostsAndUsers = exports.createPost = void 0;
const Publication_1 = __importDefault(require("../models/Publication"));
const User_1 = __importDefault(require("../models/User"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Crear un post comun
    // En otra funcion poder crear otros tipos de post
    // Y que retornen al front varios o algunos al azar y/o
    // que posean ciertas características del usuario
    const { description, image, url } = req.body;
    const publication = new Publication_1.default({ description, image, url });
    console.log(publication);
    const publicationSaved = yield publication.save();
    console.log('nuevo usuario:', publicationSaved);
    res.status(201).json(publicationSaved);
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
const getPost = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Obteniendo 1 Post');
});
exports.getPost = getPost;
const deletePost = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Eliminando Post');
});
exports.deletePost = deletePost;
const updatePost = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Actualizando Post');
});
exports.updatePost = updatePost;

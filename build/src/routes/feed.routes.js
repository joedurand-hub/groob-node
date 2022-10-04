"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publications_controller_1 = require("../controllers/publications.controller");
const getAllPostsByFollowings_controller_1 = require("../controllers/interaction/getAllPostsByFollowings.controller");
const tokenValidator_1 = require("../libs/tokenValidator");
const schemasValidator_1 = require("../libs/schemasValidator");
const multer_1 = __importDefault(require("../libs/multer"));
const publications_schema_1 = require("../schemas/publications.schema");
const profile_controller_1 = require("../controllers/profile.controller");
const router = (0, express_1.Router)();
router.post('/post', tokenValidator_1.TokenValidator, multer_1.default.fields([{
        name: 'images',
        maxCount: 7
    }]), (0, schemasValidator_1.schemaValidation)(publications_schema_1.CreatePublicationSchema), publications_controller_1.createPost);
router.post('/like/:id', tokenValidator_1.TokenValidator, publications_controller_1.likePost);
router.post('/dislike/:id', tokenValidator_1.TokenValidator, publications_controller_1.dislikePost);
router.post('/post/:id', tokenValidator_1.TokenValidator, publications_controller_1.commentPost);
router.get('/posts', tokenValidator_1.TokenValidator, getAllPostsByFollowings_controller_1.getAllPostsByFollowings);
router.get('/posts/:id', tokenValidator_1.TokenValidator, profile_controller_1.getAllPostsByUser);
router.get('/post/:id', (0, schemasValidator_1.schemaValidation)(publications_schema_1.GetOrDeletePublicationByIdSchema), publications_controller_1.getPostById);
router.delete('/post/:id', tokenValidator_1.TokenValidator, (0, schemasValidator_1.schemaValidation)(publications_schema_1.GetOrDeletePublicationByIdSchema), publications_controller_1.deletePost);
exports.default = router;

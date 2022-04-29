"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publication_controllers_1 = require("../controllers/publication.controllers");
const router = (0, express_1.Router)();
router.post('/videos', publication_controllers_1.createPost);
// router.get('/feed', getAllPost)
router.get('/videos/:id', publication_controllers_1.getPost);
router.put('/videos/:id', publication_controllers_1.updatePost);
router.delete('/videos/:id', publication_controllers_1.deletePost);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publications_controller_1 = require("../controllers/publications.controller");
const router = (0, express_1.Router)();
router.post('/feed', publications_controller_1.createPost);
router.get('/feed', publications_controller_1.getAllPostsAndUsers);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const publication_controllers_1 = require("../controllers/publication.controllers");
const users_controllers_1 = require("../controllers/users.controllers");
const router = (0, express_1.Router)();
router.post('/feed', publication_controllers_1.createPost);
router.get('/feed', publication_controllers_1.getAllPost);
router.get('/feed', users_controllers_1.getAllUsers);
exports.default = router;

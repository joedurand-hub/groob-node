"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers");
const router = (0, express_1.Router)();
router.get('/user/:id', users_controllers_1.getUser);
router.put('/user/:id', users_controllers_1.updateUser);
router.delete('/user/:id', users_controllers_1.deleteUser);
exports.default = router;

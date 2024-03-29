"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat/chat.controller");
const tokenValidator_1 = require("../libs/tokenValidator");
const router = (0, express_1.Router)();
router.post('/chat', tokenValidator_1.TokenValidator, chat_controller_1.createChat);
router.get('/chats', tokenValidator_1.TokenValidator, chat_controller_1.userChats);
router.get('/chat/:secondId', tokenValidator_1.TokenValidator, chat_controller_1.findChat);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_controller_1 = require("../controllers/chat/messages.controller");
const tokenValidator_1 = require("../libs/tokenValidator");
const router = (0, express_1.Router)();
router.post('/message', tokenValidator_1.TokenValidator, messages_controller_1.addMessage);
router.get('/message/:chatId', tokenValidator_1.TokenValidator, messages_controller_1.getMessages);
exports.default = router;

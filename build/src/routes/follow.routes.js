"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenValidator_1 = require("../libs/tokenValidator");
const follow_up_controller_1 = require("../controllers/follow_up.controller");
const router = (0, express_1.Router)();
router.post('/follow', tokenValidator_1.TokenValidator, follow_up_controller_1.follow);
router.post('/unfollow', tokenValidator_1.TokenValidator, follow_up_controller_1.unfollow);
router.get('/followers', tokenValidator_1.TokenValidator, follow_up_controller_1.getFollowers);
router.get('/followings', tokenValidator_1.TokenValidator, follow_up_controller_1.getFollowings);
exports.default = router;

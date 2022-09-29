"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const schemasValidator_1 = require("../libs/schemasValidator");
const auth__schema_1 = require("../schemas/auth..schema");
const router = (0, express_1.Router)();
router.post('/signup', (0, schemasValidator_1.schemaValidation)(auth__schema_1.SignupSchema), auth_controller_1.signup);
router.post('/login', (0, schemasValidator_1.schemaValidation)(auth__schema_1.LoginSchema), auth_controller_1.login);
router.post('/logout', auth_controller_1.logout);
// router.post('/reset', TokenValidator, reset)
exports.default = router;

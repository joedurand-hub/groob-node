"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("../controllers/profile.controller");
const tokenValidator_1 = require("../libs/tokenValidator");
const schemasValidator_1 = require("../libs/schemasValidator");
const profile_schema_1 = require("../schemas/profile.schema");
const multer_1 = __importDefault(require("../libs/multer"));
const router = (0, express_1.Router)();
router.get('/profile', tokenValidator_1.TokenValidator, profile_controller_1.getProfile);
router.get('/profile/:id', (0, schemasValidator_1.schemaValidation)(profile_schema_1.ValidateProfileParamsSchema), tokenValidator_1.TokenValidator, profile_controller_1.getProfileById);
router.get('/profile/posts', tokenValidator_1.TokenValidator, profile_controller_1.getAllPostsByUser); // trae absolutamente todos los posts del usuario.
router.get('/profiles', profile_controller_1.getAllProfiles);
router.get('/profile-reduced', tokenValidator_1.TokenValidator, profile_controller_1.getReducedUser);
router.get('/profiles-reduced/:id', tokenValidator_1.TokenValidator, profile_controller_1.getReducedUserById);
router.put('/profile/:id', tokenValidator_1.TokenValidator, (0, schemasValidator_1.schemaValidation)(profile_schema_1.ValidateProfileParamsSchema), (0, schemasValidator_1.schemaValidation)(profile_schema_1.UpdateProfileSchema), profile_controller_1.updateProfile);
router.put('/picture/:id', tokenValidator_1.TokenValidator, (0, schemasValidator_1.schemaValidation)(profile_schema_1.ValidateProfileParamsSchema), multer_1.default.fields([{ name: 'image', maxCount: 1 }]), (0, schemasValidator_1.schemaValidation)(profile_schema_1.UpdateProfileSchema), profile_controller_1.pictureProfile);
router.delete('/profile/:id', tokenValidator_1.TokenValidator, (0, schemasValidator_1.schemaValidation)(profile_schema_1.ValidateProfileParamsSchema), profile_controller_1.deleteProfile);
exports.default = router;

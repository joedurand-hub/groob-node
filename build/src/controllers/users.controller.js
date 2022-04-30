"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Obteniendo todos los usuarios');
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        const profile = yield User_1.default.findOne({ token });
        console.log("profile:", profile);
        return res.json(profile);
    }
    catch (error) {
        console.log("No se pudo traer el perfil", error);
        return res.json(error);
    }
});
exports.getUser = getUser;
const updateUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Actualizando usuario');
});
exports.updateUser = updateUser;
const deleteUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Eliminando usuario');
});
exports.deleteUser = deleteUser;

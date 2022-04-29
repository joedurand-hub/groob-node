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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const user = new User_1.default({ username, password, email });
    console.log(user);
    const userSaved = yield user.save();
    console.log('nuevo usuario:', userSaved);
    res.status(201).json(userSaved);
});
exports.createUser = createUser;
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Obteniendo todos los usuarios');
});
exports.getAllUsers = getAllUsers;
const getUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Obteniendo 1 usuario');
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

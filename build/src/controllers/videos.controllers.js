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
exports.updateVideos = exports.deleteVideos = exports.getVideo = exports.getVideos = exports.createVideos = void 0;
const Video_1 = __importDefault(require("../models/Video"));
const createVideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const video = new Video_1.default(req.body);
    console.log(video);
    res.json(video);
});
exports.createVideos = createVideos;
const getVideos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Obteniendo videos');
});
exports.getVideos = getVideos;
const getVideo = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Obteniendo 1 video');
});
exports.getVideo = getVideo;
const deleteVideos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Eliminando video');
});
exports.deleteVideos = deleteVideos;
const updateVideos = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json('Actualizando video');
});
exports.updateVideos = updateVideos;

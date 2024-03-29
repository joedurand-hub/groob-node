"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const videos_controllers_1 = require("../controllers/videos.controllers");
const router = (0, express_1.Router)();
router.get('/videos', videos_controllers_1.getVideos);
router.get('/videos/:id', videos_controllers_1.getVideo);
router.post('/videos', videos_controllers_1.createVideos);
router.delete('/videos/:id', videos_controllers_1.deleteVideos);
router.put('/videos/:id', videos_controllers_1.updateVideos);
exports.default = router;

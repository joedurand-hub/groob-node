import { Router } from 'express'
import { createPost, getPostById } from '../controllers/publications.controller';
import { getRcommendedUsersByPublicationsOnTheMoment } from '../controllers/profile.controller';
import { TokenValidator } from '../libs/tokenValidator';

const router = Router()

router.post('/feed', TokenValidator, createPost)

router.get('/post/:id', TokenValidator, getPostById)

router.get('/explore', TokenValidator, getRcommendedUsersByPublicationsOnTheMoment)

export default router;
import { Router } from 'express'
import { createPost, getAllPostsAndUsers } from '../controllers/publications.controller';

const router = Router()

router.post('/feed', createPost)

router.get('/feed', getAllPostsAndUsers)

export default router;
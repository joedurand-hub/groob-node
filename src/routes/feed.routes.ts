import { Router } from 'express'
import { createPost, getPostById, deletePost } from '../controllers/publications.controller';
import {getAllPostsByFollowings} from '../controllers/interaction/getAllPostsByFollowings.controller'
import { TokenValidator } from '../libs/tokenValidator';
import { schemaValidation } from '../libs/schemasValidator';
import multer from "../libs/multer"
import { CreatePublicationSchema, GetOrDeletePublicationByIdSchema } from '../schemas/publications.schema';
const router = Router()

router.post('/post', TokenValidator, multer.single('image'), schemaValidation(CreatePublicationSchema), createPost)

router.get('/posts', TokenValidator, getAllPostsByFollowings) 

router.get('/post/:id', TokenValidator, schemaValidation(GetOrDeletePublicationByIdSchema), getPostById)

router.delete('/post/:id', TokenValidator, schemaValidation(GetOrDeletePublicationByIdSchema), deletePost)
export default router;
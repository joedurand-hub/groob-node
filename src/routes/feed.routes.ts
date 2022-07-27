import { Router } from 'express'
import { createPost, getAllPosts, getPostById, deletePost } from '../controllers/publications.controller';
import { TokenValidator } from '../libs/tokenValidator';
import { schemaValidation } from '../libs/schemasValidator';
// import { get_all_posts_by_followings } from '../controllers/interaction_logic/get_all_posts_by_followings';
import { CreatePublicationSchema, GetOrDeletePublicationByIdSchema } from '../schemas/publications.schema';
const router = Router()

router.post('/post', TokenValidator, schemaValidation(CreatePublicationSchema), createPost)

router.get('/posts', getAllPosts) // trae absolutamente todos los posts.

// router.get('feed', TokenValidator, get_all_posts_by_followings) // trae id de a quienes sigo
// a partir de estos id puedo buscar a esos usuarios, traer sus publicaciones, ordenarlas de 
// las mas recientes a las mas antiguas y enviarlas al front.

router.get('/post/:id', schemaValidation(GetOrDeletePublicationByIdSchema), getPostById)

router.delete('/post/:id', TokenValidator, schemaValidation(GetOrDeletePublicationByIdSchema), deletePost)
export default router;
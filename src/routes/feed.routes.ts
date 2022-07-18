import { Router } from 'express'
import { create_post, get_all_posts, get_post_by_id, delete_post } from '../controllers/publications.controller';
import { TokenValidator } from '../libs/tokenValidator';
import { schemaValidation } from '../libs/schemasValidator';
// import { get_all_posts_by_followings } from '../controllers/interaction_logic/get_all_posts_by_followings';
import { CreatePublicationSchema, GetOrDeletePublicationByIdSchema } from '../schemas/publications.schema';
const router = Router()

router.post('/post', TokenValidator, schemaValidation(CreatePublicationSchema), create_post)

router.get('/posts', get_all_posts) // trae absolutamente todos los posts.

// router.get('feed', TokenValidator, get_all_posts_by_followings) // trae id de a quienes sigo
// a partir de estos id puedo buscar a esos usuarios, traer sus publicaciones, ordenarlas de 
// las mas recientes a las mas antiguas y enviarlas al front.

router.get('/post/:id', schemaValidation(GetOrDeletePublicationByIdSchema), get_post_by_id)

router.delete('/post/:id', TokenValidator, schemaValidation(GetOrDeletePublicationByIdSchema), delete_post)
export default router;
import { Router } from 'express'
import { create_post, get_post_by_id, delete_post } from '../controllers/publications.controller';
import { TokenValidator } from '../libs/tokenValidator';
import { schemaValidation } from '../libs/schemasValidator';
import { CreatePublicationSchema, GetOrDeletePublicationByIdSchema } from '../schemas/publications.schema';
const router = Router()

router.post('/feed', TokenValidator, schemaValidation(CreatePublicationSchema), create_post)

router.get('/post/:id', TokenValidator, schemaValidation(GetOrDeletePublicationByIdSchema), get_post_by_id)

router.delete('/post/:id', TokenValidator, schemaValidation(GetOrDeletePublicationByIdSchema), delete_post)
export default router;
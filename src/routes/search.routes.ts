import { Router } from 'express'
import { search_user } from '../controllers/interaction_logic/search_user';
import { TokenValidator } from '../libs/tokenValidator';
const router = Router()


router.get('/search', TokenValidator, search_user)

export default router;
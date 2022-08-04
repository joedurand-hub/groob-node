import { Router } from 'express'
import { searchUser } from '../controllers/interaction/searchUser.controller';
import { TokenValidator } from '../libs/tokenValidator';
const router = Router()


router.get('/search', TokenValidator, searchUser)

export default router;
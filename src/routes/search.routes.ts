import { Router } from 'express'
import { searchUser } from '../controllers/interaction/searchUser.controller';
import { discoverUsers } from './../controllers/interaction/discoverUsers';
import { TokenValidator } from '../libs/tokenValidator';

const router = Router()

router.get('/search', TokenValidator, searchUser)
router.get('/discover', TokenValidator, discoverUsers)

export default router;
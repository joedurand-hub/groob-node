import { Router } from 'express'
import { TokenValidator } from '../libs/tokenValidator';
import { follow, get_follows, unfollow } from '../controllers/follow_up.controller';

const router = Router()

router.post('/follow', TokenValidator, follow)

router.post('/unfollow', TokenValidator, unfollow)

router.get('/follows/:id', TokenValidator, get_follows)


export default router;
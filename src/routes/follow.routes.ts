import { Router } from 'express'
import { TokenValidator } from '../libs/tokenValidator';
import { follow, get_followings, get_followers, unfollow } from '../controllers/follow_up.controller';

const router = Router()

router.post('/follow', TokenValidator, follow)

router.post('/unfollow', TokenValidator, unfollow)

router.get('/followers', get_followers)

router.get('/followings', TokenValidator, get_followings)


export default router;
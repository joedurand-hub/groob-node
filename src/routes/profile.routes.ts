import { Router } from 'express'
import { getProfile, deleteProfile, updateProfile } from '../controllers/profile.controller';
import { TokenValidator } from '../libs/tokenValidator';

const router = Router()

router.get('/profile', TokenValidator, getProfile)

router.put('/profile/:id', TokenValidator, updateProfile)

router.delete('/profile/:id', TokenValidator, deleteProfile)


export default router;
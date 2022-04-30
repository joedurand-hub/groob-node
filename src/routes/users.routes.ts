import { Router } from 'express'
import { getUser, deleteUser, updateUser } from '../controllers/users.controller';
import { TokenValidator } from '../helpers/tokenValidator';

const router = Router()

router.get('/user/:token', TokenValidator, getUser)

router.put('/user/:token', TokenValidator, updateUser)

router.delete('/user/:id', deleteUser)


export default router;
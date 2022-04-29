import { Router } from 'express'
import { getUser, deleteUser, updateUser } from '../controllers/users.controller';


const router = Router()

router.get('/user/:id', getUser)

router.put('/user/:id', updateUser)

router.delete('/user/:id', deleteUser)


export default router;
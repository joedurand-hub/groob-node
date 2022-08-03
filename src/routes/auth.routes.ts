import { Router } from 'express'
import { signup, login, logout } from '../controllers/auth.controller';
import { schemaValidation } from '../libs/schemasValidator';
import { LoginSchema, SignupSchema } from '../schemas/auth..schema';

const router = Router()

router.post('/signup', schemaValidation(SignupSchema), signup)

router.post('/login', schemaValidation(LoginSchema), login)

router.post('/logout', logout)

// router.post('/reset', TokenValidator, reset)

export default router;
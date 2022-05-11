import { Router } from 'express'
import { signup, login, logout } from '../controllers/auth.controller';
import { schemaValidation } from '../libs/schemasValidator';
import { TokenValidator } from '../libs/tokenValidator';
import { LoginSchema, SignupSchema } from '../schemas/auth..schema';

const router = Router()

router.post('/signup', schemaValidation(SignupSchema), signup)

router.post('/login', schemaValidation(LoginSchema), login)

router.post('/logout', TokenValidator, logout)

export default router;
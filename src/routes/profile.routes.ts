import { Router } from 'express'
import { get_profile, delete_profile, update_profile } from '../controllers/profile.controller';
import { TokenValidator } from '../libs/tokenValidator';
import { schemaValidation } from '../libs/schemasValidator';
import { UpdateProfileSchema, ValidateProfileParamsSchema } from '../schemas/profile.schema';

const router = Router()

router.get('/profile/:id', TokenValidator, schemaValidation(ValidateProfileParamsSchema), get_profile)

router.put('/profile/:id', TokenValidator, schemaValidation(ValidateProfileParamsSchema), 
schemaValidation(UpdateProfileSchema), update_profile)

router.delete('/profile/:id', TokenValidator, schemaValidation(ValidateProfileParamsSchema), delete_profile)


export default router;
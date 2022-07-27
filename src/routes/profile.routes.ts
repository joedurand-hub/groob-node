import { Router } from 'express'
import { getProfile, deleteProfile, updateProfile, getProfileById, getAllProfiles } from '../controllers/profile.controller';
import { TokenValidator } from '../libs/tokenValidator';
import { schemaValidation } from '../libs/schemasValidator';
import { UpdateProfileSchema, ValidateProfileParamsSchema } from '../schemas/profile.schema';

const router = Router()

router.get('/profile', TokenValidator, getProfile)

router.get('/profile/:id', schemaValidation(ValidateProfileParamsSchema), getProfileById)

router.get('/profiles', getAllProfiles)

router.put('/profile/:id', TokenValidator, 
schemaValidation(ValidateProfileParamsSchema), schemaValidation(UpdateProfileSchema), updateProfile)

router.delete('/profile/:id', TokenValidator, 
schemaValidation(ValidateProfileParamsSchema), deleteProfile)

export default router;
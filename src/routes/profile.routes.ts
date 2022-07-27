import { Router } from 'express'
import { get_profile, delete_profile, update_profile, get_profile_by_id, get_all_profiles } from '../controllers/profile.controller';
import { TokenValidator } from '../libs/tokenValidator';
import { schemaValidation } from '../libs/schemasValidator';
import { UpdateProfileSchema, ValidateProfileParamsSchema } from '../schemas/profile.schema';

const router = Router()

router.get('/profile', TokenValidator, get_profile)

router.get('/profile/:id', schemaValidation(ValidateProfileParamsSchema), get_profile_by_id)
// getProfileById debería recibir la solicitud por query parece
router.get('/profiles', get_all_profiles)

router.put('/profile/:id', TokenValidator, 
schemaValidation(ValidateProfileParamsSchema), schemaValidation(UpdateProfileSchema), update_profile)

router.delete('/profile/:id', TokenValidator, 
schemaValidation(ValidateProfileParamsSchema), delete_profile)

export default router;
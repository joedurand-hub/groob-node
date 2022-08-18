import { Router } from 'express'
import { getProfile, deleteProfile, updateProfile, getProfileById, getAllProfiles, getAllPostsByUser, getReducedUser, getReducedUserById } from '../controllers/profile.controller';
import { TokenValidator } from '../libs/tokenValidator';
import { schemaValidation } from '../libs/schemasValidator';
import { UpdateProfileSchema, ValidateProfileParamsSchema } from '../schemas/profile.schema';
import multer from "../libs/multer"

const router = Router()

router.get('/profile', TokenValidator, getProfile)

router.get('/profile/:id', schemaValidation(ValidateProfileParamsSchema), TokenValidator, getProfileById)

router.get('/profiles', getAllProfiles)
router.get('/profile/reduced', TokenValidator, getReducedUser)
router.get('/profile/reduced/:userId', TokenValidator, getReducedUserById)

router.put('/profile/:id', TokenValidator, 
schemaValidation(ValidateProfileParamsSchema), multer.single('images'), schemaValidation(UpdateProfileSchema), updateProfile)

router.delete('/profile/:id', TokenValidator, 
schemaValidation(ValidateProfileParamsSchema), deleteProfile)

router.get('/profile/posts', TokenValidator, getAllPostsByUser) // trae absolutamente todos los posts del usuario.


export default router;
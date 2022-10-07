import { Router } from 'express'
import { mPayment } from '../controllers/bussines/checkout.controller'

import { TokenValidator } from '../libs/tokenValidator';

const router = Router()

router.post('/checkout',  mPayment)

export default router;

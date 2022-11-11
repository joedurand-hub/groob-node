import { Router } from 'express'
import { productPayment } from '../controllers/payments/product/product.controller'
import { verificationPay } from '../controllers/verification.controller'
import { webHook} from '../controllers/payments/verifyAccount/webHook.controller'

import { TokenValidator } from '../libs/tokenValidator';

const router = Router()

router.post('/verificationPay', TokenValidator, verificationPay)
// router.post('/productPreference', TokenValidator, productPayment)

// router.post('/notifications',  webHook)
// router.post('/notifications',  webHook)

export default router;

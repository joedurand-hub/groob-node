import { Router } from 'express'
import { productPayment } from '../controllers/payments/product.controller'
import { verifyAccountPay } from '../controllers/payments/verifyAccount.controller'
import { webHook} from '../controllers/payments/webHook.controller'

import { TokenValidator } from '../libs/tokenValidator';

const router = Router()

router.post('/verificationPay', TokenValidator, verifyAccountPay)
// router.post('/productPreference', TokenValidator, productPayment)

// router.post('/notifications',  webHook)
// router.post('/notifications',  webHook)

export default router;

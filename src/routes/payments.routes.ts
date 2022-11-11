import { Router } from 'express'
import { productPayment } from '../controllers/payments/product/product.controller'
import { verifyAccountPay } from '../controllers/payments/verifyAccount.controller'
import { webHook} from '../controllers/payments/verifyAccount/webHook.controller'

import { TokenValidator } from '../libs/tokenValidator';

const router = Router()

router.post('/prefer-verify', TokenValidator, verifyAccountPay)
router.post('/prefer-product', TokenValidator, productPayment)

router.post('/notifications',  webHook)
// router.post('/notifications',  webHook)

export default router;

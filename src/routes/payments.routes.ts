import { Router } from 'express'
// import { mPayment } from '../controllers/payments/checkout.controller'
import { verifyAccountPay } from '../controllers/payments/verifyAccount.controller'
import { webHook} from '../controllers/payments/webHooks.controller'

// import { TokenValidator } from '../libs/tokenValidator';

const router = Router()

router.post('/prefer-verify-account',  verifyAccountPay)
// router.post('/prefer-product',  verifyAccountPay)

router.post('/notifications',  webHook)

export default router;

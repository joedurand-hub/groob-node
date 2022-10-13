import { Router } from 'express'
import { mPayment } from '../controllers/payments/checkout.controller'
import { webHook} from '../controllers/payments/webHooks.controller'

// import { TokenValidator } from '../libs/tokenValidator';

const router = Router()

router.post('/checkout',  mPayment)

router.post('/notifications',  webHook)

export default router;

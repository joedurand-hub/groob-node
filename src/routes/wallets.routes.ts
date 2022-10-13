import { Router } from 'express'
import { createFiatWallet, getFiatWallet, updateFiatWallet } from '../controllers/wallets/fiat.controller';
import { createCryptoWallet, getCryptoWallet, updateProfile } from './../controllers/wallets/crypto.controller';
import { TokenValidator } from '../libs/tokenValidator';

const router = Router()

router.post('/wallet-fiat', TokenValidator, createFiatWallet)
router.get('/wallet-fiat', TokenValidator, getFiatWallet)
router.put('/wallet-fiat/:id', TokenValidator, updateFiatWallet)

router.post('/wallet-crypto', TokenValidator, createCryptoWallet)
router.get('/wallet-crypto', TokenValidator, getCryptoWallet)
router.put('/wallet-crypto/:id', TokenValidator, updateProfile)

export default router;
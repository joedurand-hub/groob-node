import { Router } from 'express'
import { addMessage, getMessages } from '../controllers/chat/messages.controller';
// import { TokenValidator } from '../libs/tokenValidator';

const router = Router()

router.post('/message',  addMessage)
router.get('/message/:chatId',  getMessages)
// router.get('/chat/find/:firstId/:secondId',  findChat)

export default router;
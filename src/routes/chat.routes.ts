import { Router } from 'express'
import { createChat, userChats, findChat } from '../controllers/chat/chat.controller';
// import { TokenValidator } from '../libs/tokenValidator';

const router = Router()

router.post('/chat',  createChat)
router.get('/chat/:userId',  userChats)
router.get('/chat/find/:firstId/:secondId',  findChat)

export default router;
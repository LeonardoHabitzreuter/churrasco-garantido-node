import { Router } from 'express'

import authentication from './authentication'

const router = new Router()

router.use('/auth', authentication)

export default router
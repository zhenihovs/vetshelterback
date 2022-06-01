const Router = require('express')
const router = new Router()

const animalsRouter = require('./animalsRouter')
const organizationsRouter = require('./organizationsRouter')
const authRouter = require('./authRouter')
const infoRouter = require('./infoRouter')
const categoriesRouter = require('./categoriesRouter')
const usersRouter = require('./usersRouter')



router.use('/organizations', organizationsRouter)
router.use('/auth', authRouter)
router.use('/info', infoRouter)
router.use('/animals', animalsRouter)
router.use('/categories', categoriesRouter)
router.use('/users', usersRouter)


module.exports = router
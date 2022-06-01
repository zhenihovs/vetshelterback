const Router = require('express')
const router = new Router()
const infoController = require('../controllers/infoController')

router.get('/pets', infoController.getPets)
router.get('/orgs', infoController.getOrgs)

module.exports = router
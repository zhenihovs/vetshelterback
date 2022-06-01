const Router = require('express')
const router = new Router()
const organizationsController = require('../controllers/organizationsController')
const roleMiddleware = require('../middleware/roleMiddleware')


router.get('/', roleMiddleware(["ADMIN","USER", "Veterinarian"]), organizationsController.getOrganizations)

// router.get('/:id', roleMiddleware(["ADMIN"]), organizationsController.getOrganization)

router.post('/', roleMiddleware(["ADMIN"]), organizationsController.postOrganization)

router.put('/', roleMiddleware(["ADMIN"]), organizationsController.putOrganizations)

router.delete('/', roleMiddleware(["ADMIN"]), organizationsController.deleteOrganization)

module.exports = router
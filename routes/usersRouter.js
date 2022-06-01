const Router = require('express')
const router = new Router()
const usersController = require('../controllers/usersController')
const roleMiddleware = require('../middleware/roleMiddleware')



router.get('/', roleMiddleware(["ADMIN","Veterinarian"]), usersController.getUsers)

// router.get('/:id', organizationsController.getOrganization)

// router.post('/', roleMiddleware(["ADMIN","USER","Veterinarian"]), usersController.postUser)

// router.put('/', roleMiddleware(["ADMIN","USER","Veterinarian"]),  usersController.putUser)

// router.delete('/', roleMiddleware(["ADMIN","USER","Veterinarian"]), usersController.deleteUser)

module.exports = router
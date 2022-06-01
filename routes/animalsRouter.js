const Router = require('express')
const router = new Router()
const animalsController = require('../controllers/animalsController')
const roleMiddleware = require('../middleware/roleMiddleware')


router.get('/', roleMiddleware(["ADMIN","USER","Veterinarian"]), animalsController.getAnimals)
router.post('/', roleMiddleware(["Veterinarian"]), animalsController.postAnimal)
router.put('/', roleMiddleware(["Veterinarian"]), animalsController.putAnimal)
router.delete('/', roleMiddleware(["Veterinarian"]), animalsController.deleteAnimal)



module.exports = router
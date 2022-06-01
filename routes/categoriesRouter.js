const Router = require('express')
const router = new Router()
const categoriesController = require('../controllers/categoriesController')
const roleMiddleware = require('../middleware/roleMiddleware')


router.get('/', roleMiddleware(["ADMIN","USER","Veterinarian"]), categoriesController.getCategories)
router.post('/', roleMiddleware(["Veterinarian"]), categoriesController.postCategory)
router.put('/', roleMiddleware(["Veterinarian"]), categoriesController.putCategory)
router.delete('/', roleMiddleware(["Veterinarian"]), categoriesController.deleteCategory)



module.exports = router
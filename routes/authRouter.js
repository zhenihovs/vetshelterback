const Router = require('express')
const router = new Router()
const aithController = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const {check} = require("express-validator");


router.post('/registration', [
    check('user_login', "Логин не может быть пустым").notEmpty(),
    check('user_name', "Имя пользователя не может быть пустым").notEmpty(),
    check('country', "Страна не может быть пустой").notEmpty(),
    check('address', "Адресс не может быть пустым").notEmpty(),
    check('phone', "Телефон не может быть пустым").notEmpty(),
    check('email', "Почта не может быть пустой").notEmpty(),
    check('role', "Роль не может быть пустой").notEmpty(),
    check('user_password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:3,max:10})
], aithController.registration)

router.post('/login',  aithController.login)
router.get('/auth', authMiddleware, aithController.auth)

module.exports = router
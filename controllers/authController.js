const pool = require('../db');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt= require('jsonwebtoken');

const generateAccessToken = (id, role) =>{
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, process.env.SECRET, {expiresIn: "24h"});

}

class AuthController{
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Ошибки данных регистрации', errors});
            }
            const { user_login, user_password, user_name, org_id, country, address, phone, email, role} = req.body;
            var org=null;
            if (org_id.length !==0) org = parseInt(org_id);

            const userExist = await pool.query("Select * FROM users where user_login = $1", [user_login]);
            if(userExist.rows.length !== 0){
               return res.status(400).json('Пользователь с таким Логином уже существует');
            }
            const hashPassword = bcryptjs.hashSync(user_password, 5);                
            const result = await pool.query("INSERT INTO users (user_login, user_password, user_name, org_id, country, address, phone, email, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", 
            [user_login, hashPassword, user_name, org, country, address, phone, email, role]);
            res.json("Пользователь успешно зарегистрирован");
        } catch (e) {
            console.log(e);
            res.status(400).json('Registration error');
            // next(e);
        }
    }
    
    async login(req, res) {
        try {
            const { user_login, user_password } = req.body;
            const userExist = await pool.query("Select * FROM users where user_login = $1", [user_login]);
            if(userExist.rows.length === 0){
                return res.status(400).json({message: `Пользователь с логином ${user_login} не найден`} );
            }
            const user = userExist.rows[0];
            const validPassword = bcryptjs.compareSync(user_password, user.user_password);
            if(!validPassword){
                return res.status(400).json({message: `Введен неверный пароль`} );
            }
            const token = generateAccessToken(user.id, user.role);
            return res.json({
                token,
                user: {
                    id: user.id,
                    user_login: user.user_login,
                    user_name: user.user_name,
                    org_id: user.org_id,
                    country: user.country,
                    address: user.address,
                    phone: user.phone,
                    email: user.email,
                    role: user.role
                }
            
            });

        } catch (e) {
            // console.log(e);
            res.status(400).json('Login error');
            // next(e);
        }
    }

    async auth(req, res) {
        try {
            const { id } = req.user;
            const userExist = await pool.query("Select * FROM users where id = $1", [id]);
            if(userExist.rows.length === 0){
                return res.status(400).json({message: `Пользователь с id ${id} не найден`} );
            }
            const user = userExist.rows[0];
            const token = generateAccessToken(user.id, user.role);
            return res.json({
                token,
                user: {
                    id: user.id,
                    user_login: user.user_login,
                    user_name: user.user_name,
                    org_id: user.org_id,
                    country: user.country,
                    address: user.address,
                    phone: user.phone,
                    email: user.email,
                    role: user.role
                }
            
            });

        } catch (e) {
            // console.log(e);
            res.status(400).json('Login error');
            // next(e);
        }
    }

}

module.exports = new AuthController()
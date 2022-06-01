const jwt= require('jsonwebtoken');


module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS"){
            next()
        }
    
        try{
            const token = req.headers.authorization.split(' ')[1];
            if(!token){
                return res.status(403).json("Пользователь не авторизован");
            }
            const {role: user_role}= jwt.verify(token, process.env.SECRET);
            roleIsCorrect = false;
            if(roles.includes(user_role)){
                roleIsCorrect = true;
            }
            if(!roleIsCorrect){
                return res.status(403).json("У вас нет доступа");
            }
            next();
    
        } catch(e) {
            console.log(e);
            return res.status(403).json("Пользователь не авторизован")
        }
    }
}
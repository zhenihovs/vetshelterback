


const pool = require('../db');

class UsersController{

    async getUsers(req, res, next) {
        try {
            const result = await pool.query('SELECT * FROM users ORDER BY id')
            res.json(result.rows);
        } catch (error) {
            next(error);
        }
    }


    async postUser(req, res, next) {
        try {
            const { user_login, user_password, user_name, org_id, country, address, phone, email, role} = req.body;
            const result = await pool.query("INSERT INTO users (user_login, user_password, user_name, org_id, country, address, phone, email, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", 
                [user_login, user_password, user_name, org_id, country, address, phone, email, role]);
            res.json(result.rows[0]);
        } catch (error) {
            next(error);
        }
    }

    async putUser(req, res, next) {
        try {
            const { id, user_login, user_password, user_name, org_id, country, address, phone, email, role } = req.body;

            const result = await pool.query("UPDATE users SET user_login=$1, user_password=$2, user_name=$3, org_id=$4, country=$5, address=$6, phone=$7, email=$8, role=$9 WHERE id = $10 RETURNING *", 
                [user_login, user_password, user_name, org_id, country, address, phone, email, role, id]);
            

            if (result.rows.length === 0)
                return res.status(404).json({ message: "User not found" });
            res.json(result.rows[0]);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.body;
            const result = await pool.query('DELETE FROM users where id = $1', [id])
            if (result.rowCount === 0)
                return res.status(404).json({ message: "User not found" });
            return res.sendStatus(204);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UsersController()
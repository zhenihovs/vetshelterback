const pool = require('../db');



class CategoryController{
    async getCategories(req, res, next) {
        try {
            const result = await pool.query('SELECT * FROM categories ORDER BY id')
            res.json(result.rows);
        } catch (error) {
            next(error);
        }
    }


    async postCategory(req, res, next) {
        try {
            const { category_name} = req.body;
            const result = await pool.query("INSERT INTO categories (category_name) VALUES ($1) RETURNING *", 
                [category_name]);
            res.json(result.rows[0]);
        } catch (error) {
            next(error);
        }
    }

    async putCategory(req, res, next) {
        try {
            const { id, category_name } = req.body;

            const result = await pool.query("UPDATE categories SET category_name=$1 WHERE id = $2 RETURNING *", 
                [category_name, id]);
            

            if (result.rows.length === 0)
                return res.status(404).json({ message: "Category not found" });
            res.json(result.rows[0]);
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.body;
            const result = await pool.query('DELETE FROM categories where id = $1', [id])
            if (result.rowCount === 0)
                return res.status(404).json({ message: "Category not found" });
            return res.sendStatus(204);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController()
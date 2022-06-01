const pool = require('../db');



class OrganizationsController{


    async getOrganizations(req, res, next) {
        try {
            const result = await pool.query('SELECT * FROM organizations ORDER BY id')
            res.json(result.rows);
        } catch (error) {
            next(error);
        }
    }

    // async getOrganization(req, res, next) {
    //     try {
    //         const {id} = req.params;
    //         const result = await pool.query('SELECT * FROM organizations WHERE id = $1', [id])
    //         if (result.rows.length === 0)
    //             return res.status(404).json({ message: "Organization not found" });
    //         res.json(result.rows);
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    async postOrganization(req, res, next) {
        try {
            const { org_name,country,address,inn,kpp,phone,email} = req.body;
            const result = await pool.query("INSERT INTO organizations (org_name, country, address, inn, kpp, phone, email) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
                [org_name,country,address,inn,kpp,phone,email]);
            res.json(result.rows[0]);
        } catch (error) {
            next(error);
        }
    }

    async putOrganizations(req, res, next) {
        try {
            const { id, org_name,country,address,inn,kpp,phone,email} = req.body;

            const result = await pool.query("UPDATE organizations SET org_name=$1, country= $2, address=$3, inn=$4, kpp=$5, phone=$6, email=$7 WHERE id = $8 RETURNING *", 
                [org_name,country,address,inn,kpp,phone,email, id]);
            

            if (result.rows.length === 0)
                return res.status(404).json({ message: "Organization not found" });
            res.json(result.rows[0]);
        } catch (error) {
            next(error);
        }
    }

    async deleteOrganization(req, res, next) {
        try {
            const { id } = req.body;
            const result = await pool.query('DELETE FROM organizations where id = $1', [id])
            if (result.rowCount === 0)
                return res.status(404).json({ message: "Organization not found" });
            return res.sendStatus(204);

        } catch (error) {
            next(error);
        }


    }
}

module.exports = new OrganizationsController()
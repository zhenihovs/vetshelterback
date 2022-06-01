const pool = require('../db');



class AnimalsController{
    async getAnimals(req, res, next) {
        try {
            const result = await pool.query('SELECT pets.id, pet_name, category, categories.category_name, breed, gender, birthdate, registration_date, passport_num, identification_num, chip_num, vacination_date, vacination_date_end, deworming_date, deworming_date_end, photo, owner_user, users.user_name, owner_company, organizations.org_name FROM pets join categories on pets.category = categories.id left join users on pets.owner_user = users.id left join organizations on pets.owner_company = organizations.id  ORDER BY id')
            res.json(result.rows);
        } catch (error) {
            next(error);
        }
    }


    async postAnimal(req, res, next) {
        try {
            const { pet_name, category, breed, gender, birthdate, registration_date, passport_num, identification_num, chip_num, vacination_date, vacination_date_end, deworming_date, deworming_date_end,  owner_user, owner_company} = req.body;
            var user=null;
            var company=null;
            if (owner_user.length !==0) user = parseInt(owner_user);
            if (owner_company.length !==0) company = parseInt(owner_company);
            let postResult = await pool.query("INSERT INTO pets (pet_name, category, breed, gender, birthdate, registration_date, passport_num, identification_num, chip_num, vacination_date, vacination_date_end, deworming_date, deworming_date_end,  owner_user, owner_company) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *", 
                [pet_name, category, breed, gender, birthdate, registration_date, passport_num, identification_num, chip_num, vacination_date, vacination_date_end, deworming_date, deworming_date_end,  user, company]);
            if (postResult.rows.length !== 0) 
                postResult = await pool.query('SELECT pets.id, pet_name, category, categories.category_name, breed, gender, birthdate, registration_date, passport_num, identification_num, chip_num, vacination_date, vacination_date_end, deworming_date, deworming_date_end, photo, owner_user, users.user_name, owner_company, organizations.org_name FROM pets join categories on pets.category = categories.id left join users on pets.owner_user = users.id left join organizations on pets.owner_company = organizations.id where pets.id = $1',[postResult.rows[0].id]);
            res.json(postResult.rows[0]);
        } catch (error) {
            next(error);
        }
    }

    async putAnimal(req, res, next) {
        try {
            const { id, pet_name, category, breed, gender, birthdate, registration_date, passport_num, identification_num, chip_num, vacination_date, vacination_date_end, deworming_date, deworming_date_end,  owner_user, owner_company } = req.body;

            var user=null;
            var company=null;
            if (owner_user.length !==0) user = parseInt(owner_user);
            if (owner_company.length !==0) company = parseInt(owner_company);
            const putResult = await pool.query("UPDATE pets SET pet_name=$1, category=$2, breed=$3, gender=$4, birthdate=$5, registration_date=$6, passport_num=$7, identification_num=$8, chip_num=$9, vacination_date=$10, vacination_date_end=$11, deworming_date=$12, deworming_date_end=$13, owner_user=$14, owner_company=$15 WHERE id = $16 RETURNING *", 
                [pet_name, category, breed, gender, birthdate, registration_date, passport_num, identification_num, chip_num, vacination_date, vacination_date_end, deworming_date, deworming_date_end,  user, company, id]);

            let result;
            if (putResult.rows.length !== 0) 
                result = await pool.query('SELECT pets.id, pet_name, category, categories.category_name, breed, gender, birthdate, registration_date, passport_num, identification_num, chip_num, vacination_date, vacination_date_end, deworming_date, deworming_date_end, photo, owner_user, users.user_name, owner_company, organizations.org_name FROM pets join categories on pets.category = categories.id left join users on pets.owner_user = users.id left join organizations on pets.owner_company = organizations.id where pets.id = $1',[id])
            else
                return res.status(404).json({ message: "Pet not found" });

            res.json(result.rows[0]);
        } catch (error) {
            next(error);
        }
    }

    async deleteAnimal(req, res, next) {
        try {
            const { id } = req.body;
            const result = await pool.query('DELETE FROM pets where id = $1', [id])
            if (result.rowCount === 0)
                return res.status(404).json({ message: "Pet not found" });
            return res.sendStatus(204);

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AnimalsController()
const pool = require('../db');



class InfoController{
    async getPets(req, res) {
        try {
            const result = await pool.query('select pets.id, pet_name, categories.category_name, breed, gender, birthdate, organizations.org_name, organizations.country, organizations.address, organizations.phone from pets JOIN organizations on pets.owner_company = organizations.id JOIN categories on pets.category = categories.id WHERE (owner_user ISNULL and owner_company NOTNULL)')
            res.json(result.rows);
        } catch (error) {
            console.log(error)

        }
    }

    async getOrgs(req, res) {
        try {
            const result = await pool.query('SELECT  organizations.id, org_name, country, address, phone, email, COUNT(*) FILTER (WHERE pets.owner_company NOTNULL and pets.owner_user ISNULL) AS pets_count, COUNT(*) FILTER (WHERE pets.category= 1 and pets.owner_company NOTNULL and pets.owner_user ISNULL) AS cats_count, COUNT(*) FILTER (WHERE pets.category= 2 and pets.owner_company NOTNULL and pets.owner_user ISNULL) AS dogs_count FROM organizations LEFT JOIN pets on organizations.id = pets.owner_company GROUP BY organizations.id, org_name, country, address, phone, email ORDER BY organizations.id')
            res.json(result.rows);
        } catch (error) {
            console.log(error)
        }
    }
    
   
}

module.exports = new InfoController()
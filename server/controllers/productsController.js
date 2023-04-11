
const { db, query } = require('../database')
module.exports = {
    addProduct: async (req, res) => {
        const { name, description, price, category } = req.body
        const productQuery = await query(`SELECT * FROM products WHERE name = ${db.escape(name)}`)
        const categoryQuery = await query(`SELECT * FROM categories WHERE category_name=${db.escape(category)}`)
        const categoryId = categoryQuery[0].categories_ID
        console.log(categoryId);
        console.log(req.file);
        if (productQuery.length > 0) {
            return res.status(200).send({ message: 'name duplicate' })
            
        }
        let filename = null
        if (req.file) {
            filename ='/' + req.file.filename
            
        }
        const addProduct = await query(`INSERT INTO products VALUES (null,${db.escape(name)},${db.escape(description)},${db.escape(filename)},${db.escape(price)},false,null,${db.escape(categoryId)})`)
        return res.status(200).send({ message: 'Register Succes' })
    },
    addCategory: async (req, res) => {
        const name = req.body.name
        const categoryQuery = await query(`SELECT * FROM categories WHERE category_name=${db.escape(name)}`)
        console.log(categoryQuery);
        if (categoryQuery.length > 0) {
            return res.status(200).send({ message: 'category already use' })
            
        }
        const addCategory = await query(`INSERT INTO categories VALUES (null,${db.escape(name)},null)`)
        return res.status(200).send({ message: 'category been added' })
        
    },
}
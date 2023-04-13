
const products = require('../models/productsModels')
const categories = require('../models/categoriesModel')
module.exports = {
    addProduct: async (req, res) => {
        // let { name, description, price, category,isActive } = req.body
        // const productQuery = await query(`SELECT * FROM products WHERE name = ${db.escape(name)}`)
        // const categoryQuery = await query(`SELECT * FROM categories WHERE category_name=${db.escape(category)}`)
        // const categoryId = categoryQuery[0].categories_ID
        // console.log(categoryId);
        // console.log(req.file);
        // if (productQuery.length > 0) {
        //     return res.status(200).send({ message: 'name duplicate' })
            
        // }
        // let filename = null
        // if (req.file) {
        //     filename ='/' + req.file.filename
            
        // }
        // if (!isActive) {
        //     isActive = true
            
        // }
        // const addProduct = await query(`INSERT INTO products VALUES (null,${db.escape(name)},${db.escape(description)},${db.escape(filename)},${db.escape(price)},${db.escape(isActive)},null,${db.escape(categoryId)})`)
        // return res.status(200).send({ message: 'Register Succes' })
        let { name, description, price, category, isActive } = req.body;
        const product = await products.findOne({ where: { name } });
        const categoryQuery = await categories.findOne({ where: { category_name: category } });
        const categoryId = categoryQuery.categories_ID;
    
        if (product) {
          return res.status(200).send({ message: 'Name is already taken' });
        }
    
        let filename = null;
        if (req.file) {
          filename = '/' + req.file.filename;
        }
    
        if (!isActive) {
          isActive = true;
        }
    
        const addProduct = await products.create({
          name,
          description,
          image: filename,
          price,
          isActive,
          user_ID: null,
          category_ID: categoryId,
        });
    
        return res.status(200).send({ message: 'Product added successfully' });
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
    editProduct: async (req, res) => {
        // const  idProduct  = parseInt(req.params.id)
        // const { name, description, price,isActive  } = req.body
        // let updateQuery = `UPDATE products SET`

        // if (name) {
        //     updateQuery += ` name = ${db.escape(name)},`
        // }
        // if (description) {
        //     updateQuery += ` description = ${db.escape(description)},`
        // }
        // if (price) {
        //     updateQuery += ` price = ${db.escape(price)},`
        // }
        // if (isActive) {
        //     updateQuery += ` isActive = ${db.escape(isActive)} `
            
        // }
        // updateQuery = updateQuery.slice(0,-1)
        // console.log(updateQuery);
        // updateQuery = await query(updateQuery + ` WHERE product_ID = ${db.escape(idProduct)}`)
        // return res.status(200).send({message:'Update succes'})
        const idProduct = parseInt(req.params.id);
        const { name, description, price, isActive } = req.body;
        
        try {
          const product = await products.findOne({
            where: { product_ID: idProduct },
          });
          
          if (!product) {
            return res.status(404).send({ message: 'Product not found' });
          }
          
          await product.update({
            name,
            description,
            price,
            isActive,
          });
          
          return res.status(200).send({ message: 'Update success' });
        } catch (error) {
          console.error(error);
          return res.status(500).send({ message: 'Server error' });
        }
    },
    editCategories: async (req, res) => {
        const idCat = parseInt(req.params.id)
        const {name} = req.body
        console.log(name);
        await query(`UPDATE categories SET category_name = ${db.escape(name)} WHERE categories_ID = ${db.escape(idCat)}`)
        return res.status(200).send({message:"update succes"})
    },
    fetchProducts: async (req, res) => {
        try {
            const productList = await products.findAll() ;
            return res.status(200).send(productList);
          } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Internal server error' });
          }
    }, sortProducts: async (req, res) => {
        
    }

}
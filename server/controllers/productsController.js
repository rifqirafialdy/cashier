
const products = require('../models/productsModels')
const categories = require('../models/categoriesModel');
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
        console.log(req.body);
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
          categories_ID: categoryId,
        });
        await addProduct.save();
    
        return res.status(200).send({ message: 'Product added successfully' });
    },
    addCategory: async (req, res) => {
        const { name } = req.body;

  try {
    const existingCategory = await categories.findOne({
      where: { category_name: name },
    });

    if (existingCategory) {
      return res.status(200).send({ message: "Category already exists" });
    }

    const newCategory = await categories.create({
      category_name: name,
    });

    return res.status(200).send({ message: "Category added" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal server error" });
  }
        
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
          let filename = null;
          if (req.file) {
            filename = '/' + req.file.filename;
          }
      
          if (!isActive) {
            isActive = true;
          }
          
          await product.update({
            name,
            description,
            image:filename,
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
        const idCat = parseInt(req.params.id);
  const { name } = req.body;

  try {
    const category = await categories.findByPk(idCat);

    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }

    category.category_name = name;
    await category.save();

    return res.status(200).send({ message: "Update successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal server error" });
  }
    },
    fetchProducts: async (req, res) => {
      const { page, sort, order } = req.body;
      console.log(page);
      try {
        let productList;
        if (sort && order) {
          let orderBy = 'name';
          let sortOrder = 'ASC';
          if (sort === 'price') {
            orderBy = 'price';
          }
          if (order === 'DESC') {
            sortOrder = 'DESC';
          }
          productList = await products.findAll({
            limit: 9,
            offset: page,
            order: [[orderBy, sortOrder]],
          });
        } else {
          productList = await products.findAll({
            limit: 9,
            offset: page,
          });
        }
        return res.status(200).send(productList);
      } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
      }
    },
  filterProducts: async (req, res) => {
    const categoryName = req.body.category
      
        const filteredProducts = await products.findAll({
            include: {
              model: categories, 
          }, where: { '$category.category_name$': categoryName },
          attributes: {exclude: ['category']}
            
        });
        return res.status(200).send({filteredProducts})
          
  },deleteProduct: async (req, res) => {
      const idProduct = parseInt(req.params.id)
      
    
    try {
      const product = await products.destroy({
        where: {
          product_ID: idProduct
        }
      })
      
      if (product) {
        res.status(200).json({ message: `Product with ID ${idProduct} has been deleted` })
      } else {
        res.status(404).json({ error: `Product with ID ${idProduct} not found` })
      }
      
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }, fetchCategories: async (req, res) => {
    try {
      const categoriesList = await categories.findAll() ;
      return res.status(200).send(categoriesList);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'Internal server error' });
    }
  },
  fetchAllData: async (req, res) => {
    const allProducts = await products.findAll()
    return res.status(200).send(allProducts)
       
     }
  

}
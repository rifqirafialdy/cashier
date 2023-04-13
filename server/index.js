const express = require('express')
const PORT = 8001
const app = express()
const { db, query } = require("./database")
const { productsRoute } = require('./routes')
app.use(express.json())

app.use('/products',productsRoute)


app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT)
})
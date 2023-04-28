const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('cashier', 'root', 'Rahasia1', {
  logging:false,
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to MySQL database');
  })
  .catch((err) => {
    console.error('Unable to connect to MySQL database:', err);
  });

module.exports = sequelize;
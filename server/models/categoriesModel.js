const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const categories = sequelize.define('categories', {
    categories_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    user_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'user_ID'
        }
    }
},{
    timestamps: false
  });

module.exports = categories;

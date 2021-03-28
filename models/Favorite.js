const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Favorite extends Model{}

Favorite.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'favorite',
        underscored: true,
        freezeTableName: true
    }
)

module.exports = Favorite
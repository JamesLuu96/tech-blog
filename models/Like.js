const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Like extends Model{}

Like.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        comment_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'comment',
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
        modelName: 'like',
        underscored: true,
        freezeTableName: true
    }
)

module.exports = Like
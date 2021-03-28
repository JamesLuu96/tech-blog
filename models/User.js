const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

class User extends Model{
    checkPassword(password){
        return bcrypt.compareSync(password, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3]
            }
        }
    },
    {
        sequelize,
        modelName: 'user',
        underscored: true,
        freezeTableName: true,
        hooks: {
            async beforeCreate(data){
                data.password = await bcrypt.hash(data.password, 10)
                return data
            },
            async beforeUpdate(data){
                data.password = await bcrypt.hash(data.password, 10)
                return data
            }
        }
    }
)

module.exports = User
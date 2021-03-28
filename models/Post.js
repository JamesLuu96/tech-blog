const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Post extends Model{
    static favorite(body, models){
        return models.Vote.create({
            user_id: body.user_id,
            post_id: body.post_id
        }).then(()=>{
            return Post.findOne({
                where: {
                    id: body.post_id
                },
                attributes: [
                    'id',
                    'title',
                    'created_at',
                    [
                        sequelize.literal(`(SELECT COUNT(*) FROM vote WHERE post_id = vote.post_id)`,
                        'vote_count')
                    ]
                ]
            })
        })
    }
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        post_text: {
            type: DataTypes.STRING,
            allowNull: false
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
        modelName: 'post',
        underscored: true,
        freezeTableName: true
    }
)

module.exports = Post
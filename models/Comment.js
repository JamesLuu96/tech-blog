const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Comment extends Model{
    static like(body, models){
        return models.Like.create({
            user_id: body.user_id,
            comment_id: body.comment_id
        }).then(()=>{
            return Comment.findOne({
                where: {
                    id: body.comment_id
                },
                attributes: [
                    'id',
                    'comment_text',
                    'created_at',
                    [sequelize.literal('(SELECT COUNT(*) FROM tech_blog.like WHERE tech_blog.like.comment_id = tech_blog.comment.id)'), 'total_likes']
                ]
            })
        })
    }
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false
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
        modelName: 'comment',
        underscored: true,
        freezeTableName: true
    }
)

module.exports = Comment
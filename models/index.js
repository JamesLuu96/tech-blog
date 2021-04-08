const User = require('./User')
const Post = require('./Post')
const Like = require('./Like')
const Comment = require('./Comment')
const Favorite = require('./Favorite')

// User.hasMany(Post, {foreignKey: 'user_id', onDelete: 'CASCADE'})




Post.belongsTo(User, {foreignKey: 'user_id', onDelete: 'CASCADE'})
Comment.belongsTo(Post, {foreignKey: 'post_id', onDelete: 'CASCADE'})
Comment.belongsTo(User, {foreignKey: 'user_id', onDelete: 'CASCADE'})
Post.hasMany(Comment, {foreignKey: 'post_id'})
Post.hasMany(Favorite, {foreignKey: 'post_id'})

User.hasMany(Post, {foreignKey: 'user_id', onDelete: 'CASCADE'})
User.hasMany(Like, {foreignKey: 'user_id', onDelete: 'CASCADE'})
User.hasMany(Favorite, {foreignKey: 'user_id', onDelete: 'CASCADE'})
User.hasMany(Comment, {foreignKey: 'user_id', onDelete: 'CASCADE'})


Like.belongsTo(Comment, {foreignKey: 'comment_id', onDelete: 'CASCADE'})
Like.belongsTo(User, {foreignKey: 'user_id', onDelete: 'CASCADE'})

Favorite.belongsTo(User, {foreignKey: 'user_id', onDelete: 'CASCADE'})
Favorite.belongsTo(Post, {foreignKey: 'post_id', onDelete: 'CASCADE'})

Comment.hasMany(Like, {foreignKey: 'comment_id'})

User.belongsToMany(Post, {
    through: Favorite,
    as: 'favorite_posts',
    foreignKey: 'user_id'
})

Post.belongsToMany(User, {
    through: Favorite,
    as: 'favorite_posts',
    foreignKey: 'post_id'
})

User.belongsToMany(Comment, {
    through: Like,
    as: 'liked_comments',
    foreignKey: 'user_id'
})

Comment.belongsToMany(User, {
    through: Like,
    as: 'liked_comments',
    foreignKey: 'comment_id'
})

module.exports = {User, Post, Like, Comment, Favorite}
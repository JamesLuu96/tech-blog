const router = require('express').Router()
const {Comment, User, Post} = require('../../models')
const sequelize = require('../../config/connection')

router.get('/', (req, res)=>{
    Comment.findAll({
        attributes: [
            'id',
            'comment_text',
            'created_at', 
            [sequelize.literal('(SELECT COUNT(*) FROM tech_blog.like WHERE tech_blog.like.comment_id = tech_blog.comment.id)'), 'total_likes']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Post,
                attributes: ['post_text']
            }
        ]
    })
    .then(dbCommentData=>res.json(dbCommentData))
    .catch(err=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
    })
})

router.post('/', (req, res)=>{
    if(req.session.user_id){
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
        .then(dbCommentData=>res.json(dbCommentData))
        .catch(err=>{
            if(err){
                console.log(err)
                res.status(500).json(err)
            }
        })
    }
})

router.delete('/:id', (req, res)=>{

})

module.exports = router
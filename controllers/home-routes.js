const router = require('express').Router()
const {User, Post, Comment, Favorite} = require('../models')
const sequelize = require('../config/connection')

router.get('/', (req, res)=>{
    Post.findAll({
        attributes: [
            'id',
            'post_title',
            'post_text',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE post.id = favorite.post_id)'), 'favorite_count'],
            [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
        ],
        include:[
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data=>{
        const posts = data.map(x=>x.get({plain:true}))
        res.render('homepage', {posts, loggedIn: req.session.loggedIn, loggedInUser: req.session.username})
    })
})

router.get('/post/:id', (req, res)=>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_title',
            'post_text',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE post.id = favorite.post_id)'), 'favorite_count'],
            [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
        ],
        include:[
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at',
                    [sequelize.literal('(SELECT COUNT(*) FROM nma8se88rul01k9i.like WHERE comments.id = like.comment_id)'), 'total_likes']
                ],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
    .then(data=>{  
        const post = data.get({plain:true})
        // post.loggedIn = req.session.loggedIn
        res.render('single-post', {...post, loggedIn: req.session.loggedIn, loggedInUser: req.session.username})
    })
    .catch((err)=>{
        res.status(400).json(err)
    })
})

router.get('/dashboard', (req, res)=>{
    if(!req.session.loggedIn){
        res.redirect('/')
    }
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_title',
            'post_text',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE post.id = favorite.post_id)'), 'favorite_count'],
            [sequelize.literal('(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)'), 'comment_count']
        ],
        include:[
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data=>{
        const posts = data.map(x=>x.get({plain:true}))
        res.render('dashboard', {posts, loggedIn: req.session.loggedIn}) 
    })
    
})

router.get('/login', (req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/')
    }
    res.render('login')
})

router.get('/signup', (req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/')
    }
    res.render('signup')
})

router.put('/logout', (req, res)=>{
    if(req.session.loggedIn){
        req.session.destroy(()=>{
            res.status(204).end()
        })
    }else{
        res.status(404).end()
    }
})

module.exports = router
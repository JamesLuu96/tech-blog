const {Post, User, Favorite, Comment} = require('../../models')
const router = require('express').Router()
const sequelize = require('../../config/connection')

router.get('/', (req, res)=>{
    Post.findAll(
        {
            attributes: 
            [
                'id',
                'post_text',
                'created_at',
                [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE post.id = favorite.post_id)'), 'favorite_count']
            ],
            order: [['created_at', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [ 'id', 'comment_text', 'post_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        }
    )
    .then(dbPostData=>res.json(dbPostData))
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

router.get('/:id', (req, res)=>{
    Post.findOne(
        {
            where: {
                id: req.params.id
            },
            attributes: ['id', 'post_text', 'created_at', [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE post.id = favorite.post_id)'), 'favorite_count']],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        }
    )
    .then(dbPostData=>{
        if(!dbPostData){
            res.status(404).json({message: `Not Found.`})
            return
        }
        res.json(dbPostData)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/', (req, res)=>{
    if(req.session){
        Post.create(
            {
                post_text: req.body.post_text,
                user_id: req.session.user_id
            }
        )
        .then(dbPostData => res.json(dbPostData))
        .catch(err=>{
            console.log(err)
            res.status(500).json(err)
        })
    }
})

router.put('/favorite', (req, res)=>{
    if(req.session.user_id){
        req.body.user_id = req.session.user_id
        Post.favorite(req.body, {Favorite})
        .then(dbFavoriteData => res.json(dbFavoriteData))
        .catch(err=>res.json(err))
    }
})

router.put('/:id', (req, res)=>{
    Post.update(
        {
            post_text: req.body.post_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData){
            res.status(400).json({message:`Can't find that post!`})
            return
        }
        res.json(dbPostData)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})



router.delete('/:id', (req, res)=>{
    Post.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData =>{
        if(!dbPostData){
            res.status(400).json({message:`No Post Found.`})
            return
        }
        res.json(dbPostData)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
})
module.exports = router
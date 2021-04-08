const router = require('express').Router()
const {User, Post, Favorite, Comment} = require('../../models')


router.get('/', (req, res)=>{
    User.findAll({
        attributes: {
            exclude: ['password']
        },
        attributes: ['id', 'email', 'username', 'created_at']
    })
    .then(response=>{
        res.json(response)
    })
})

router.get('/:id', (req, res)=>{
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['password']
        },
        attributes: ['id', 'email', 'username', 'created_at'],
        include: [
            {
                model: Post,
                attributes: ['id', 'post_text']
            },
            {
                model: Post,
                through: Favorite,
                as: 'favorite_posts',
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ],
                attributes: ['id', 'post_text']
            },
            {
                model: Comment,
                attributes: ['comment_text'],
                include: [
                    {
                        model: Post,
                        attributes: ['post_text']
                    }
                ]
            }
        ]
    })
    .then(response=>{
        res.json(response)
    })
})

router.post('/', (req,res)=>{
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(data=>{
        req.session.save(()=>{
            req.session.user_id = data.id
            req.session.username = data.username
            req.session.loggedIn = loggedIn
            res.json(data)
        })
    })
    .catch(err=>{
        if(err){
            console.log(err)
            res.status(500).json(err)
        }
    })
})

router.post('/login', (req, res)=>{
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(data=>{
        if(!data){
            res.status(400).json({message:'No user with that email'})
            return
        }
        const validPassword = data.checkPassword(req.body.password)
        if(validPassword){
            req.session.save(()=>{
                req.session.user_id = data.id
                req.session.username = data.username
                req.session.loggedIn = true
                res.json({user: data, message: 'Success'})
            })
        } else{
            res.status(400).json({message: 'Invalid password.'})
        }
    })
})

router.post('/logout', (req, res)=>{
    if(req.session.loggedIn){
        req.session.destroy(()=>{
            res.status(204).end()
        })
    }else{
        res.status(404).end()
    }
})

router.delete('/:id', (req,res)=>{
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router
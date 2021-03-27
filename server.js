require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const sequelize = require('./config/connection')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sess = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: new SequelizeStore({
        db: sequelize
    })
}
app.use(session(sess))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

sequelize.sync({force: false})
.then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Now listening on port: ${PORT}`)
    })
})
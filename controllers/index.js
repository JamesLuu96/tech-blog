const router = require('express').Router()

router.use('/api', require('./api'))
router.use('/', require('./home-routes'))

module.exports = router
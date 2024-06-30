const express = require('express')
const router = express.Router()
const {getCities, getCountries} = require('./controllers')


router.get('/api/region/countries', getCountries )
router.get('/api/region/cities', getCities )


module.exports = router
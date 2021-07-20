const router = require('express').Router();
const user = require('./userRoutes');



//api/v1/user
router.use('/user', user);



module.exports = router; 
const router = require('express').Router();

const { isAuthenticated, signup } = require('../middleware');

const userController = require('../contollers/users');
//api/v1/user/signup
router.post('/signup', signup, userController.signup);

//api/v1/user/login
router.post('/login', userController.login);

router.get('/', (req, res) => {
    res.send({
        message: 'User Routes'
    })
})

router.get('/dash', isAuthenticated, userController.findByID);

module.exports = router;
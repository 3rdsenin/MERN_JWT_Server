const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


function jwtSignUser(user) {
    return jwt.sign(user, config.jwt, {
        expiresIn: '1d',
    })

}

module.exports = {
    findByID: (req, res) => {
        const { user } = req;
        if (!user) {
            return res.status(400).send({ error: 'server issue, please try again' })
        } else {
            return res.json(user);
        }
    },

    async signup(req, res) {
        try {


            const user = await User.create(req.body);
            const userObj = user.toJSON();
            return res.send({ token: jwtSignUser(userObj) });
        } catch (error) {
            console.log(error);
            if (Object.keys(error.keyValue[0] === 'username')) {
                return res.status(400).send({ error: 'user already exists' })
            }
            return res.status(400).send({ error: 'something is wrong' })
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(403).send({ error: 'User not found try to signup instead' })
            }

            const isPasswordValid = await user.verifyPassword(password);

            if (!isPasswordValid) {
                return res.status(403).send({ error: 'wrong password' })
            }

            const userJson = user.toJSON();
            return res.send({ token: jwtSignUser(userJson) });
        } catch (error) {
            return res.status(500).send({ error: 'we have an error' })

        }
    }
}
const passport = require('passport');
const Joi = require('joi')

module.exports = {

    isAuthenticated: (req, res, next) => {
        passport.authenticate('jwt', (err, user) => {
            if (err || !user) {
                res.status(403).send({
                    error: 'Unauthorized'
                })
            } else {
                req.user = user;
            }

        })(req, res, next);
    },

    signup: (req, res, next) => {
        const schema = Joi.object({
            username: Joi.string().email().required(),
            password: Joi.string().regex(
                new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
            )


        })
        const { error } = schema.validate(req.body);
        if (error) {

            switch (error.details[0].context.key) {
                case 'username':

                    res.status(400).send({
                        error: 'Username is not valid'
                    })

                    break;
                case 'password':

                    res.status(400).send({
                        error: 'Password is not valid. Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
                    })

                    break;

                default:
                case 'username':

                    return res.status(400).send({
                        error: 'Invalid registration info'
                    })


                    break;
            }
        } else {
            next();
        }


    }
}
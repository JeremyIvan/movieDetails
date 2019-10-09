const passport = require('passport')

const User = require('../../models/users/users')

exports.signUpUser = (req, res, next) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if(err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.json({ err : err })
        }
        else {
            user.save((err, user) => {
                passport.authenticate('local')(req, res, () => {
                    if (err){
                        res.statusCode = 500
                        res.setHeader("Content-Type", "application/json");
                        res.json({err: err})
                        return
                    }
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(user)
                })
            })
        }
    })
}

const { authSecret } = require('../auth.config');
const passport = require('passport');
const passpportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passpportJwt;
//import user from '../models/userModel'
const Users = require('../models/userModel');
module.exports = app => {
    let a = app
    const users = new Users();
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    const strategy = new Strategy(params, (playload, done)=>{
        users.userForId(playload).then(user => done(null,user ? { ...playload } : false))
        .catch(err => done(err, false))

    });
    console.log(strategy);
    passport.use(strategy);

    return {
        authenticate: ()=> passport.authenticate('jwt', {session: false}),
    }
}

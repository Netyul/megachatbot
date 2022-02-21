
import { authSecret } from '../auth.config';
import passport from 'passport';
import passpportJwt from 'passport-jwt';
import users from '../models/userModel'
const { Strategy, ExtractJwt } = passpportJwt;
export default function Passport() {
        const user = new users()
   
        const params = {
            secretOrKey: authSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }
        const strategy = new Strategy(params, (playload, done)=>{
            //console.log('payload: ', playload)
            user.userForId(playload).then(userToken => done(null,userToken ? { ...playload } : false))
            .catch(err => done(err, false))
    
        });
        passport.use(strategy);
    
        return {
            authenticate: () => passport.authenticate('jwt', {session: false}),
        }
    
}
// module.exports = app =>{
//     const {userForId} = app.src.models.v1.users;
//     const params = {
//         secretOrKey: authSecret,
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
//     }
//     const strategy = new Strategy(params, (playload, done)=>{
//         userForId(playload).then(user => done(null,user ? { ...playload } : false))
//         .catch(err => done(err, false))

//     });
//     passport.use(strategy);

//     return {
//         authenticate: ()=> passport.authenticate('jwt', {session: false}),
//     }
// }
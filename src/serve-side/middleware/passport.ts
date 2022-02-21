
import { authSecret } from '../auth.config';
import passport from 'passport';
import passpportJwt from 'passport-jwt';
import users from '../models/userModel'
import { Verify } from 'crypto';
const { Strategy, ExtractJwt } = passpportJwt;
type Data = any;
export default function Passport(req:Data, res:any) {
        const user = new users()
    
        const params = {
            secretOrKey: authSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }
        
        const strategy = new Strategy(params, function(playload, done){
            
            console.log('payload: ', playload)
            user.userForId(playload).then(user => {
                
                done(null,user ? { ...playload } : false)
            })
            .catch(err => res.status(401).send(err))
    
        });
        console.log(passport.use(strategy))
        ;
    
        
        return {
            authenticate:  () => passport.authenticate('jwt', {session: false},((arg) =>{
                console.log(arg)
            })),
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
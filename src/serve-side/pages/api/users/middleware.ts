
import type { NextRequest, NextMiddleware } from 'next/server'
import { authSecret } from '../../../auth.config';
import passport from 'passport';
import passpportJwt from 'passport-jwt';
import users from '../../../models/userModel'
const { Strategy, ExtractJwt } = passpportJwt;

export async function middleware(req:NextRequest) {
    // console.log(req.cookies)
    const user = new users()
   
        const params = {
            secretOrKey: authSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }
        console.log(params.jwtFromRequest(req))
        const strategy = new Strategy(params, async (playload, done)=>{
            console.log('payload: ', playload)
            // await user.userForId(playload).then(userToken => done(null,userToken ? { ...playload } : false))
            // .catch(err => done(err, false))
    
        });
        passport.use(strategy);
    
        return {
            authenticate: () => passport.authenticate('jwt', {session: false}),
        }

}
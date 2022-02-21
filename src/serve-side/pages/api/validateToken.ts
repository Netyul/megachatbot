import type { NextApiRequest, NextApiResponse } from 'next'
import authSecret from '../../auth.config';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jwt-simple';
type Data = {
  code:number,
  msg: string,
  data:any,
  status:number
  
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  let auth = authSecret.authSecret;
  const userData = req.body || false;
  let code = 1;
  let msg = 'token valido';
  let status = 200;
  if(req.method === 'POST'){

    try {
        if(userData) {
            let token = jwt.decode(userData.token, auth);
            if (new Date(token.expire_at * 1000) > new Date()) {
              res.status(status).json({code:code, status: status, msg:msg, data: userData});
            }
        }
    } catch (error) {
        //problema no token
    }
    
      
    res.status(401).json({ code: 1, status: 401, msg: 'tokem não é mais valido' , data:[]})
  }else{
    status = 405;
    msg = `O method ${req.method} não e permitido nesta requisição`;
    res.status(status).json({ code: 2, status:status, msg: msg, data: []})
  }
  
}
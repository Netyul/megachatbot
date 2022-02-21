import type { NextApiRequest, NextApiResponse } from 'next'
import usersModel from '../../../models/userModel'
import authSecret from '../../../auth.config';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jwt-simple';
type Data = {
    token: string,
    count: number,
    limit: number,
    id: number,
    email: string,
    username: string,
    type: string,
    issuered_at: number,
    expire_at: number,
    code: number,
    status: number,
    msg: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    let rt = {
        token: '',
        count: 0,
        limit: 0,
        id: 0,
        email: '',
        username: '',
        type: '',
        issuered_at: 0,
        expire_at: 0,
        code: 0,
        status: 0,
        msg: ''
    }
    if (req.method === 'POST') {
        const users = new usersModel()
        const auth = authSecret.authSecret;
        let conta = 0;
        let lim = 0;
        let mensage = 'dados retornados com sucesso';
        let code = 1;
        let status = 200
        const login = req.body;
        console.log('corpo da requisição', login);

        if(!req.body.username || !req.body.password) {
            rt.msg = 'Informe Usuário e Senha';
            rt.status = 422;
            rt.code = 0;
            res.status(rt.status).json(rt)
        }
        let user = await users.VerifyUserForUsername(req.body);
        let userEmail = await users.VerifyUserForEmailAuth(req.body);
        console.log('usuario no banco', user);
        if(!user){
            if(!userEmail){
                rt.msg= 'usuario não encontrado';
                rt.status = 400;
                res.status(status).json(rt)
            }else{
                user = userEmail;
            }
        }
        if(user.enable == 0){
            rt.msg= 'usuario desativado'
            rt.status = 400;
            res.status(rt.status).json(rt)
            
        }
        const isMatch =  bcrypt.compareSync(req.body.password, user.password);
        if(!isMatch){
            rt.msg='Usuário ou Senha incorretos'
            rt.status = 400;
            res.status(rt.status).json(rt)

        }

        const tokenNow = Math.floor(Date.now() / 1000);
        const playload = { 
            id: user.id,
            email: user.email,
            username: user.username,
            type: user.type,
            issuered_at: tokenNow,
            expire_at: tokenNow + (60 * 60 * 24 * 3)
        }
        let tokenEncode = jwt.encode(playload, auth);
        let token = {
            code: code, 
            status:status, 
            msg: mensage,
            ...playload, 
            token: tokenEncode,
            count: conta,
            limit:lim
        }
       
        res.status(status).json(token);
      } else {
          rt.msg= 'Não e Premitido outro tipo de method a nao ser post'
          rt.status = 405;
        res.status(rt.status).json(rt)
      }
}
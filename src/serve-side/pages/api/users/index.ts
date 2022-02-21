import type { NextApiRequest, NextApiResponse } from 'next'
import Passport from '../../../middleware/passport';
import user from '../../../models/userModel'
const app = require('../../../middleware/passportTeste')
type Data = {
  code:number,
  msg: string,
  data:any,
  count:number,
  limit: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    app.authenticate
    Passport(req, res).authenticate()
    let lim = 20;
    const usuario = new user()
    const rt = await usuario.selectForLimit({limit: lim})
    let cont = rt.length;
    

    if(req.method === 'GET'){

        res.status(200).json({ code: 1, msg: `dados retornados com sucesso no method ${req.method}`, data: rt, count:cont, limit:lim })
    }
}

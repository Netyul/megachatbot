// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import user from '../../models/userModel'

type Data = {
  code:number,
  msg: string,
  data:any,
  count:number,
  limit: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  let lim = 20;
  const usuario = new user()
  const rt = await usuario.selectForLimit({limit: lim})
  let cont = rt.length;
  
  res.status(200).json({ code: 1, msg: 'dados retornados com sucesso', data: rt, count:cont, limit:lim })
}

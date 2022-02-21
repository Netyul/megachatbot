
import db from '../config/database';

type UserLogin={
    username: string,
    password: string
}

interface Usuarios{
    selectAll():void;
    selectForLimit(params:any): any;
    userForId(params:any):any;
    VerifyUserForUsername(params:UserLogin):object;
    VerifyUserForEmailAuth(params:UserLogin):object;
}

class Users implements Usuarios{
    constructor(){

    }
    async selectAll(){
        return await db.select('*').from('sys_users')
    }
    async selectForLimit(params:any) {
        return await db.select('*').from('sys_users').limit(params.limit)
    }
    async userForId(params:any){
        return await db("sys_users").where({id: params.id}).timeout(1000);
    }
    async VerifyUserForUsername(params:UserLogin){
        return await db("sys_users").where({username: params.username}).first();
    }
    async VerifyUserForEmailAuth(params:UserLogin){
        return await db("sys_users").where({email: params.username}).first();
    }
}
export default Users;
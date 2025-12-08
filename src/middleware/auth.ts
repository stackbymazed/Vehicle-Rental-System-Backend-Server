import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../config/db";

const auth = (...roles:string[ ]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token){
            throw new Error("You are Unauthorized")
        }
        const decoded = jwt.verify(token,config.Jwt_Secret!) as JwtPayload

        const user = await pool.query(`SELECT * FROM users WHERE email=$1`,[decoded.email])

        if(user.rows[0] === 0){
            throw new Error("User Not found !")
        }
        req.user = decoded;
        console.log(decoded);
        next()
    }
}

export default auth;
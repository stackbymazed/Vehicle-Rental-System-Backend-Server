import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import config from "../config";
import { pool } from "../config/db";

const auth = (...roles: string[]) => {
    // console.log(roles);
    return async (req: Request, res: Response, next: NextFunction) => {
        // const header = req.headers.authorization;
        const token = req.headers.authorization;
        // if (!header || !header.startsWith("Bearer ")) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Unauthorized: No token provided",
        //     });
        // }

        // const token = header.split(" ")[1];

        const decoded = jwt.verify(token as string, config.Jwt_Secret!) as JwtPayload

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Invalid token",
            });
        }

        const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [decoded.email])

        if (user.rows[0] === 0) {
            throw new Error("User Not found !")
        }
        req.user = decoded;
        // console.log(decoded);
        const userRole = decoded.role?.trim(); // whitespace remove

        if (roles.length && !roles.includes(userRole)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });
        }


        next()
    }
}

export default auth;
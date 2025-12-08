import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import config from "../../config";

const SignUpUser = async (data: any) => {
    const { name, email, password, phone, role } = data;
    const hashPassword = await bcrypt.hash(password as string, 12)

    const result = await pool.query(`INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`, [name, email, hashPassword, phone, role]);

    delete result.rows[0].password;
    delete result.rows[0].created_at;
    delete result.rows[0].updated_at;
    return result;
}

const SignInUser = async (data: any) => {
    const { email, password } = data;

    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (result.rows.length === 0) {
        throw new Error("User Not found !")
    }

    const matchedPassword = await bcrypt.compare(password, result.rows[0].password)

    if (!matchedPassword) {
        throw new Error("Invalid Credentials!")
    }

    const payload = {
        id: result.rows[0].id,
        name: result.rows[0].name,
        email: result.rows[0].email
    }

    const secret = config.Jwt_Secret
    const token = jwt.sign(payload, secret!, { expiresIn: "7d" })

    delete result.rows[0].password;
    delete result.rows[0].created_at;
    delete result.rows[0].updated_at;

    return { token, user: result.rows[0] };
}


export const AuthService = {
    SignUpUser,
    SignInUser
}

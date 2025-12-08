import { pool } from "../../config/db";

const SignUpUser = async (data: any) => {
    const { name, email, password, phone, role } = data;
    const result = await pool.query(`INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`, [name, email, password, phone, role]);
    return result;
}


export const AuthService = {
    SignUpUser,
}

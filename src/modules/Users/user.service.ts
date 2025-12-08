import { pool } from "../../config/db";

const AllUserService = async () => {
    const result = await pool.query(`SELECT * FROM users`)
    return result;
}

const SingleUserUpdateService = async (data: any, id: string) => {
    const { name, email, password, phone, role } = data;
    const result = await pool.query(`UPDATE Users SET name = $1,email = $2,password = $3,phone = $4 'role' = $5 WHERE id = $6 RETURNING *`, [name, email, password, phone, role, id]);
    return result;
}

const SingleUserDeleteService = async ( id: string) => {
    const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
    return result;
}


export const UserService = {
    AllUserService,
    SingleUserUpdateService,
    SingleUserDeleteService,
}
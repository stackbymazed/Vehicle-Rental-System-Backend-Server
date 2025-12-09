import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db";

const AllUserService = async () => {
    const result = await pool.query(`SELECT * FROM users`)
    delete result.rows[0].password;
    delete result.rows[0].created_at;
    delete result.rows[0].updated_at;
    return result;
}

const SingleUserUpdateService = async (data: any, id: string, user: JwtPayload) => {
    const { name, email, password, phone, role } = data;
    const CurrentUserEmail = user.email;
    const CheckCanUserPut = await pool.query(`SELECT * FROM users WHERE email = $1`, [CurrentUserEmail])
    if (CheckCanUserPut.rows[0].id == id || CheckCanUserPut.rows[0].role == "admin") {
        const result = await pool.query(`UPDATE Users SET name = $1,email = $2,password = $3,phone = $4 'role' = $5 WHERE id = $6 RETURNING *`, [name, email, password, phone, role, id]);
        return result;
    } else {
        throw new Error("Unauthorized User!You Don,t put")
    }
}

const SingleUserDeleteService = async (id: string, user: any) => {
    const { email, role } = user;
    const CheckHaveUser = await pool.query(`SELECT * FROM bookings WHERE customer_id = $1`, [id])

    CheckHaveUser.rows.map(singleData => {
        if (singleData.status == "active") {
            throw new Error("You con,t Delete this user ! active bookings exist!")
        }
    })
    const result = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [id]);
    return result;
}


export const UserService = {
    AllUserService,
    SingleUserUpdateService,
    SingleUserDeleteService,
}
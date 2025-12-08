import { pool } from "../../config/db"

const BookingAdd = async (data: any) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status } = data;
    const result = await pool.query(
        ` INSERT INTO Bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6)RETURNING *`, [ customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status ]);

    return result.rows[0];
}

export const BookingService = {
    BookingAdd,
}
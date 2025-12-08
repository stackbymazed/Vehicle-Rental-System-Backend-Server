import { pool } from "../../config/db"

const BookingAdd = async (data: any) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = data;

    const vehicle_info = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [vehicle_id])
    if (vehicle_info.rows.length == 0) {
        throw new Error("Vehicle Not found")
    }
    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);

    const diffInMs = end.getTime() - start.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    const dailyRent = vehicle_info.rows[0].daily_rent_price;
    const total_price = dailyRent * diffInDays;
    console.log(total_price);

    const status = "booked";

    const result = await pool.query(
        ` INSERT INTO Bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status ) VALUES ($1, $2, $3, $4, $5, $6 ) RETURNING *`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status]);

    delete result.rows[0].created_at
    delete result.rows[0].updated_at
    return result;
}


const AllBookingService = async () => {
    const result = await pool.query(`SELECT * FROM bookings`)

    delete result.rows[0].created_at
    delete result.rows[0].updated_at
    return result;
}

export const BookingService = {
    BookingAdd,
    AllBookingService,
}
import { JwtPayload } from "jsonwebtoken";
import { pool } from "../../config/db"
import moment from "moment";

const createBooking = async (customer_id: number, vehicle_id: number, rent_start_date: Date, rent_end_date: Date) => {
    try {
        // Fetch vehicle data
        const vehicleRes = await pool.query(
            `SELECT * FROM vehicles WHERE id = $1`,
            [vehicle_id]
        );

        if (vehicleRes.rows[0].availability_status === "booked") {
            throw new Error("Vehicle Is Already Booked");
        }

        const UpdateVehicleStatus = await pool.query(
            `UPDATE vehicles SET availability_status = 'booked' WHERE id = $1`,
            [vehicle_id]
        )

        if (UpdateVehicleStatus.rowCount === 0) {
            throw new Error("Vehicle not found");
        }
        const vehicle = vehicleRes.rows[0];

        // Update vehicle availability
        // await pool.query(
        //     `UPDATE vehicles SET availability_status = 'unavailable' WHERE id = $1`,
        //     [vehicle_id]
        // );

        // Fetch customer data
        const customerRes = await pool.query(
            `SELECT name, email FROM users WHERE id = $1`,
            [customer_id]
        );

        if (customerRes.rowCount === 0) {
            throw new Error("Customer not found");
        }

        const customer = customerRes.rows[0];

        const vehicleData = {
            vehicle_name: vehicle.vehicle_name,
            registration_number: vehicle.registration_number,
            availability_status: vehicle.availability_status,
            type: vehicle.type
        };

        const customerData = {
            name: customer.name,
            email: customer.email
        };

        const startDate = moment(rent_start_date);
        const endDate = moment(rent_end_date);

        // Calculate number of days
        let totalDay = endDate.diff(startDate, "days");

        // Ensure minimum 1 day
        if (totalDay <= 0) {
            throw new Error("rent_end_date must be after rent_start_date");
        }

        // Calculate total price
        const totalPrice = vehicle.daily_rent_price * totalDay;


        // Insert booking with JSON data
        const rental = await pool.query(
            `INSERT INTO bookings 
            (customer_id, vehicle_id, rent_start_date, rent_end_date, status, total_price, customer, vehicle) 
            VALUES ($1, $2, $3, $4, 'active', $5, $6, $7)
            RETURNING *`,
            [
                customer_id,
                vehicle_id,
                rent_start_date,
                rent_end_date,
                totalPrice,
                customerData,
                vehicleData
            ]
        );

        const booking = rental.rows[0];


        // Remove fields before returning
        delete booking.customer;
        const parsedVehicle = booking.vehicle;
        delete parsedVehicle.availability_status;
        delete parsedVehicle.type;
        booking.vehicle = parsedVehicle;
        delete booking.created_at
        delete booking.updated_at
        return booking;

    } catch (error: any) {
        throw new Error(error.message);
    }
};


const AllBookingService = async (user: JwtPayload) => {
    //token theke user
    const CurrentUserRole = user.role;
    const CurrentUserId = user.id;

    //token user er users collection theke taa
    // const CheckCanUserSee = await pool.query(`SELECT * FROM users WHERE email = $1`, [CurrentUserEmail])

    if (CurrentUserRole == "admin") {
        const result = await pool.query(`SELECT * FROM bookings`)
        delete result.rows[0].created_at
        delete result.rows[0].updated_at
        return result;
    }
    const result = await pool.query(`SELECT * FROM bookings WHERE customer_id = $1`, [CurrentUserId])

    delete result.rows[0].created_at
    delete result.rows[0].updated_at
    return result;
}


const updateBookingService = async (bookingId: any, status: string, role: string) => {
    // console.log({ bookingId, status, role });
    if (status.trim() == "cancelled" && role.trim() == "admin") {
        throw new Error('Only can cancelled by customer');
    }

    if (status.trim() == "returned" && role.trim() == "customer") {
        throw new Error('Only can returned by admin')
    }
    // console.log("condition e dukbo");
    if (status.trim() === "cancelled" && role.trim() === "customer") {
        // console.log("customer e gece");
        const result = await pool.query(`UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`, [status, bookingId])

        await pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1 RETURNING *`, [result.rows[0].vehicle_id])

        delete result.rows[0].vehicle
        delete result.rows[0].customer

        return result;
    }
    else if (status.trim() == "returned" && role.trim() == "admin") {
        // console.log("admin kace gece");
        const findBookings = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId])
        if (findBookings.rows.length == 0) {
            throw new Error("ID not Match!")
        }
        // console.log(findBookings);
        const fullVehicle = findBookings.rows[0].vehicle
        const data = await {
            ...fullVehicle,
            availability_status: "available"
        }
        // console.log(data);
        const result = await pool.query(`UPDATE bookings SET status = $1 , vehicle = $2 WHERE id = $3 RETURNING *`, [status, data, bookingId])

        await pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1 RETURNING *`, [result.rows[0].vehicle_id])

        delete result.rows[0].customer
        // console.log(result);

        return result;
    }
    return []
}



export const BookingService = {
    createBooking,
    AllBookingService,
    updateBookingService

}
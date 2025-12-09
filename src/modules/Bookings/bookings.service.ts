import { pool } from "../../config/db"
import moment from "moment";

const createBooking = async (
    customer_id: number,
    vehicle_id: number,
    rent_start_date: Date,
    rent_end_date: Date
) => {
    try {
        // Fetch vehicle data
        const vehicleRes = await pool.query(
            `SELECT * FROM vehicles WHERE id = $1`,
            [vehicle_id]
        );

        if (vehicleRes.rows[0].availability_status === "unavailable") {
            throw new Error("Vehicle Is Already Booked");
        }

        await pool.query(
            `UPDATE vehicles SET availability_status = 'unavailable' WHERE id = $1`,
            [vehicle_id]
        )

        if (vehicleRes.rowCount === 0) {
            throw new Error("Vehicle not found");
        }

        const vehicle = vehicleRes.rows[0];

        // Update vehicle availability
        await pool.query(
            `UPDATE vehicles SET availability_status = 'unavailable' WHERE id = $1`,
            [vehicle_id]
        );

        // Fetch customer data
        const customerRes = await pool.query(
            `SELECT name, email FROM users WHERE id = $1`,
            [customer_id]
        );

        if (customerRes.rowCount === 0) {
            throw new Error("Customer not found");
        }

        const customer = customerRes.rows[0];

        // Prepare JSON data
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

        // Price calculation
        const totalDay = moment(rent_end_date).diff(rent_start_date, "days");
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
                JSON.stringify(customerData), // FIXED
                JSON.stringify(vehicleData)   // FIXED
            ]
        );

        const booking = rental.rows[0];


        // Remove fields before returning
        delete booking.customer;
        const parsedVehicle = JSON.parse(booking.vehicle);
        delete parsedVehicle.availability_status;
        delete parsedVehicle.type;
        booking.vehicle = parsedVehicle;
        console.log(booking);
        return booking;

    } catch (error: any) {
        throw new Error(error.message);
    }
};


const AllBookingService = async () => {
    const result = await pool.query(`SELECT * FROM bookings`)

    delete result.rows[0].created_at
    delete result.rows[0].updated_at
    return result;
}


const updateBookingById = async (bookingId: any, status: string, role: string) => {

    if (status === "cancelled" && role === "admin") {
        throw new Error('Only can cancelled by customer')
    }

    if (status === "returned" && role === "customer") {
        throw new Error('Only can returned by admin')
    }

    if (status === "cancelled" && role === "customer") {
        const result = await pool.query(`UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *`, [status, bookingId])

        await pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1 RETURNING *`, [result.rows[0].vehicle_id])

        delete result.rows[0].vehicle
        delete result.rows[0].customer

        return result.rows[0]
    }
    else if (status === "returned" && role === "admin") {
        const findBookings = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId])

        const fullVehicle = JSON.parse(findBookings.rows[0].vehicle)
        const data = {
            ...fullVehicle,
            availability_status: "available"
        }

        const result = await pool.query(`UPDATE bookings SET status = $1 , vehicle = $3 WHERE id = $2 RETURNING *`, [status, bookingId, data])

        await pool.query(`UPDATE vehicles SET availability_status = 'available' WHERE id = $1 RETURNING *`, [result.rows[0].vehicle_id])

        delete result.rows[0].customer
        const vehicleDataParse = result.rows[0].vehicle ? JSON.parse(result.rows[0].vehicle) : null;
        result.rows[0].vehicle = vehicleDataParse

        return await result.rows[0]
    }
    return []
}



export const BookingService = {
    createBooking,
    AllBookingService,
    updateBookingById

}
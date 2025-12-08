import { Pool } from "pg"
import config from "."

export const pool = new Pool({
    connectionString: `${config.Connection_str}`
})


export const initDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(200) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password TEXT NOT NULL,
            phone VARCHAR(15) NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'customer',
            CONSTRAINT email_lowercase CHECK (email = LOWER(email)),
            CONSTRAINT password_min_length CHECK (char_length(password) >= 6),
            CONSTRAINT role_check CHECK (role IN ('admin', 'customer'))
        );
    `);

    await pool.query(`
       CREATE TABLE IF NOT EXISTS vehicles (
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(200) NOT NULL,
        type VARCHAR(100) NOT NULL,
        registration_number VARCHAR(100) NOT NULL UNIQUE,
        daily_rent_price NUMERIC(100) NOT NULL,
        availability_status VARCHAR(200) NOT NULL DEFAULT 'available',


        CONSTRAINT type_check CHECK (type IN ('car', 'bike', 'van', 'SUV')),
        CONSTRAINT price_positive CHECK (daily_rent_price > 0),
        CONSTRAINT availability_check CHECK (availability_status IN ('available', 'booked'))
       ) 
    `)

    await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        vehicle_id INTEGER NOT NULL,
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL,
        total_price NUMERIC(10,2) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'active',

        CONSTRAINT fk_customer
            FOREIGN KEY (customer_id) REFERENCES Users(id) ON DELETE CASCADE,

        CONSTRAINT fk_vehicle
            FOREIGN KEY (vehicle_id) REFERENCES Vehicles(id) ON DELETE CASCADE,

        CONSTRAINT date_check
            CHECK (rent_end_date > rent_start_date),

        CONSTRAINT price_check
            CHECK (total_price > 0),

        CONSTRAINT status_check
            CHECK (status IN ('active', 'cancelled', 'returned'))
        );

    `)

}
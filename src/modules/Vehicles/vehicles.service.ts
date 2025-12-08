import { pool } from "../../config/db";

const CrateVehicleService = async (data: any) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = data;
    const result = await pool.query(`INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return result;
}


const AllVehiclesService = async () => {
    const result = await pool.query(`SELECT * FROM vehicles`)
    return result;
}

const SingleVehicleService = async (id: string) => {
    const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
    return result;
}

const UpdateSingleVehicleService = async (data:any,id: string) => {
    const {vehicle_name, type, registration_number, daily_rent_price, availability_status}=data;
    const result = await pool.query(`UPDATE vehicles SET vehicle_name = $1,type = $2 ,registration_number = $3,daily_rent_price = $4,availability_status = $5 WHERE id = $6 RETURNING *;
`, [vehicle_name, type, registration_number, daily_rent_price, availability_status,id]);
    return result;
}

const DeleteSingleVehicleService = async (id: string) => {
    const result = await pool.query(`DELETE FROM vehicles WHERE id = $1 RETURNING *`, [id]);
    return result;
}


export const VehicleService = {
    CrateVehicleService,
    AllVehiclesService,
    SingleVehicleService,
    UpdateSingleVehicleService,
    DeleteSingleVehicleService
}
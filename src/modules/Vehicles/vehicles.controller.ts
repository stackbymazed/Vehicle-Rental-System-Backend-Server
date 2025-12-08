import { Request, Response } from "express";
import { VehicleService } from "./vehicles.service";

const createVehicle = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await VehicleService.CrateVehicleService(data);
        res.status(200).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}


const AllVehicles = async (req: Request, res: Response) => {
    try {
        const result = await VehicleService.AllVehiclesService();
        res.status(200).json({
            success: true,
            message: "All Vehicle found successfully",
            data: result.rows
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const SingleVehicle = async (req: Request, res: Response) => {
    try {
        const result = await VehicleService.SingleVehicleService(req.params.vehicleId!);
        res.status(200).json({
            success: true,
            message: "Single Vehicle found successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const updateSingleVehicle = async (req: Request, res: Response) => {
    try {
        const result = await VehicleService.UpdateSingleVehicleService(req.body,req.params.vehicleId!);
        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result.rowCount
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const DeleteSingleVehicle = async (req: Request, res: Response) => {
    try {
        const result = await VehicleService.DeleteSingleVehicleService(req.params.vehicleId!);
        if(result.rows.length == 1){
            res.status(200).json({
            success: true,
            message: "Vehicle Deleted successfully",
            data: result.rows[0]
        })
        }
        res.status(200).json({
            success: true,
            message: "Vehicle Deleted data not found",
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

export  const vehiclesController = {
    createVehicle,
    AllVehicles,
    SingleVehicle,
    updateSingleVehicle,
    DeleteSingleVehicle
};
import { Request, Response } from "express";
import { BookingService } from "./bookings.service";

const CreateBooking = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await BookingService.BookingAdd(data);
        res.status(200).json({
            success: true,
            message: "Booking created successfully",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}


export const BookingController = {
    CreateBooking,
}
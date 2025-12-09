import { Request, Response } from "express";
import { BookingService } from "./bookings.service";
import { JwtPayload } from "jsonwebtoken";

const CreateBooking = async (req: Request, res: Response) => {
    //       user er id ,vehicle er id
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = req.body;
    try {
        const result = await BookingService.createBooking(customer_id, vehicle_id, rent_start_date, rent_end_date);

        res.status(200).json({
            success: true,
            message: "Booking created successfully",
            data: result
        })

    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}

const AllBooking = async (req: Request, res: Response) => {
    const user = req.user
    try {
        const result = await BookingService.AllBookingService(user as JwtPayload);
        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: result.rows
        })
    } catch (err: any) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
}


const updateBookingById = async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const { role } = req.user as JwtPayload;
    const { status } = req.body;

    try {
        const result = await BookingService.updateBookingService(bookingId, status, role);
        res.status(200).json({
            success: true,
            message: "Booking updated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}


export const BookingController = {
    CreateBooking,
    AllBooking,
    updateBookingById

}
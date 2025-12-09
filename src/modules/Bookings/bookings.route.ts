import { Router } from "express";
import { BookingController } from "./bookings.controller";

const router = Router()

router.post("/",BookingController.CreateBooking)

router.get("/",BookingController.AllBooking)

router.put("/:bookingId",BookingController.updateBookingById)

export const BookingRouter  = {
    router,
}
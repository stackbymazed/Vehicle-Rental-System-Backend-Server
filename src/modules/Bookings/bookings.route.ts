import { Router } from "express";
import { BookingController } from "./bookings.controller";
import auth from "../../middleware/auth";
import { Roles } from "../Auth/auth.constant";

const router = Router()

router.post("/",auth(Roles.admin, Roles.customer), BookingController.CreateBooking)

router.get("/", auth(Roles.admin, Roles.customer), BookingController.AllBooking)

router.put("/:bookingId", auth(Roles.admin, Roles.customer), BookingController.updateBookingById)

export const BookingRouter = {
    router,
}
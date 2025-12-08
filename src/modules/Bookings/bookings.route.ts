import { Router } from "express";
import app from "../..";
import { BookingController } from "./bookings.controller";

const router = Router()

router.post("/",BookingController.CreateBooking)

export const BookingRouter  = {
    router,
}
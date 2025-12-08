import { Router } from "express";
import app from "../..";
import { BookingController } from "./bookings.controller";

const router = Router()

router.post("/",BookingController.CreateBooking)

router.get("/",BookingController.AllBooking)

export const BookingRouter  = {
    router,
}
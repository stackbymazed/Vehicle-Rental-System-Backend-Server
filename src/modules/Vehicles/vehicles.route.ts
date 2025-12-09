import { Router } from "express"
import { vehiclesController } from "./vehicles.controller"
import auth from "../../middleware/auth"
import { Roles } from "../Auth/auth.constant"

const router = Router()

router.post("/", auth(Roles.admin), vehiclesController.createVehicle)

router.get("/", vehiclesController.AllVehicles)

router.get("/:vehicleId", vehiclesController.SingleVehicle)

router.put("/:vehicleId", auth(Roles.admin), vehiclesController.updateSingleVehicle)

router.delete("/:vehicleId", auth(Roles.admin), vehiclesController.DeleteSingleVehicle)


export const vehiclesRouter = {
    router,
}
import { Router } from "express"
import { vehiclesController } from "./vehicles.controller"

const router = Router()

router.post("/",vehiclesController.createVehicle)

router.get("/",vehiclesController.AllVehicles)

router.get("/:vehicleId",vehiclesController.SingleVehicle)

router.put("/:vehicleId",vehiclesController.updateSingleVehicle)

router.delete("/:vehicleId",vehiclesController.DeleteSingleVehicle)


export const vehiclesRouter = {
    router,
}
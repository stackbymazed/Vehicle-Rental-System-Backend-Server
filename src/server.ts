import app, { port } from "."
import { AuthRouter } from "./modules/Auth/auth.route"
import { BookingRouter } from "./modules/Bookings/bookings.route"
import { UserRouter } from "./modules/Users/users.route"
import { vehiclesRouter } from "./modules/Vehicles/vehicles.route"


app.use("/api/v1/vehicles",vehiclesRouter.router)

app.use("/api/v1/auth",AuthRouter.router)

app.use("/api/v1/users",UserRouter.router)


app.use("/api/v1/bookings",BookingRouter.router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

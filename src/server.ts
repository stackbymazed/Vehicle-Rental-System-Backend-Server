import app, { port } from "."
import { UserRouter } from "./modules/Users/users.route"
import { vehiclesRouter } from "./modules/Vehicles/vehicles.route"


app.use("/api/v1/vehicles",vehiclesRouter.router)

app.use("/api/v1/users",UserRouter.router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

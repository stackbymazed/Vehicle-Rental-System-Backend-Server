import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.join(process.cwd(), ".env") })

const config={
    Connection_str : process.env.CONNECTION_STR,
    Port: process.env.PORT
}

export default config;
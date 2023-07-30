import express from "express"
import cors from "cors"
import { router } from "./routers/router"

const port = process.env.PORT || 3001

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(port, () => (
    console.log(""),
    console.log({ Server: `http://localhost:${port}` })
)
)
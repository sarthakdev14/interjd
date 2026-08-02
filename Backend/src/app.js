const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

const allowedOrigins = ["https://interjd.vercel.app", "http://localhost:5173", "http://127.0.0.1:5173"]

app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    const origin = req.headers.origin

    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin)
        res.setHeader("Access-Control-Allow-Credentials", "true")
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization")
        res.setHeader("Vary", "Origin")
    }

    if (req.method === "OPTIONS") {
        return res.status(204).end()
    }

    next()
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app
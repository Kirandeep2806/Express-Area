import express from "express";

const app = express()
const port = 6996

app.get("/", (req, res) => {
    res.send("<h1>King!!</h1>")
})

app.listen(port, () => {
    console.log(`I am on the port ${port}`);
})

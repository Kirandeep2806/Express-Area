import express from "express";

const app = express()
const port = 6996

app.get("/", (req, res) => {
    res.send("<h1>I am on the Screen!!</h1>")
})

app.get("/about", (req, res) => {
    res.send("<h1>Hey, I am Kiran Deep</h1>")
    console.log(res.statusCode);
})

app.listen(port, () => {
    console.log(`Server running on the port ${port}`);
})

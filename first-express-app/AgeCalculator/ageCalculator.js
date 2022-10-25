const express = require("express")

const app = express()
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    console.log(req.body);
})

app.listen(6969, () => {
    console.log("Serving on port 6969!!");
})

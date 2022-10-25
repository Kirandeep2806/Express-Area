const express = require("express")
const {AgeFromDateString, AgeFromDate} = require("age-calculator")

const app = express()
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    let dob = req.body.dob;
    let ageFromString = new AgeFromDateString(dob).age
    res.send(`Your age is : ${ageFromString}`);
})

app.listen(6969, () => {
    console.log("Serving on port 6969!!");
})

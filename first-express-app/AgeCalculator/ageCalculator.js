const express = require("express")
const {AgeFromDateString, AgeFromDate} = require("age-calculator")

const app = express()
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/weather", (req, res) => {
    const apiKey = "293f292922f11a4efffd648aee55d7af"

})

app.post("/", (req, res) => {
    let dob = req.body.dob;
    let ageFromString = new AgeFromDateString(dob).age
    res.send(`Your age is : ${ageFromString}`);
})

app.listen(6969, () => {
    console.log("Serving on port 6969!!");
})

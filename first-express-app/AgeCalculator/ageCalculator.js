const express = require("express");
const {AgeFromDateString, AgeFromDate} = require("age-calculator");
const https = require("https");

const app = express()
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/weather", (req, res) => {
    res.sendFile(__dirname + "/getLocation.html")
})

app.post("/weather", (req, res) => {
    const apiKey = "293f292922f11a4efffd648aee55d7af"
    // Using the API for fetching the location coordinates
    const data = req.body;
    const geoApiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${data.location}&appid=293f292922f11a4efffd648aee55d7af`
    https.get(geoApiURL, (res) => {
        res.on('data', (data) => {
            const JSONResponse = JSON.parse(data)
            console.log(JSONResponse);
        })
    })

})

app.post("/", (req, res) => {
    let dob = req.body.dob;
    let ageFromString = new AgeFromDateString(dob).age
    res.send(`Your age is : ${ageFromString}`);
})

app.listen(8000, () => {
    console.log("Serving on port 8000!!");
})

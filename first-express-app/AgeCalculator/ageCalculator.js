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
    const geoApiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${data.location}&appid=${apiKey}`;
    https.get(geoApiURL, (HttpsResponse) => {
        HttpsResponse.on('data', (data) => {
            const JSONResponse = JSON.parse(data)
            let latitude = JSONResponse[0].lat
            let longitude = JSONResponse[0].lon

            // Using the API to fetch the weather
            const language = "en";
            const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=${language}`;
            https.get(weatherApiURL, (HttpsResponse) => {
                HttpsResponse.on("data", (data) => {
                    const JSONResponse = JSON.parse(data);
                    console.log(JSONResponse);
                })
            })
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

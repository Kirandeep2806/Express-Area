const express = require("express");
const { AgeFromDateString, AgeFromDate } = require("age-calculator");
const https = require("https");
const { setTimeout } = require("timers/promises");

const app = express()
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/weather", (req, res) => {
    console.log(res.statusCode);
    res.sendFile(__dirname + "/getLocation.html")
})

app.post("/weather", (req, res) => {
    const apiKey = "293f292922f11a4efffd648aee55d7af"

    // Using the API for fetching the location coordinates
    const data = req.body;
    const location = data.location
    const geoApiURL = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${apiKey}`;
    https.get(geoApiURL, (HttpsResponse) => {
        HttpsResponse.on('data', (data) => {
            const JSONResponse = JSON.parse(data)
            if (JSONResponse.length>0) {
                let latitude = JSONResponse[0].lat
                let longitude = JSONResponse[0].lon

                // Using the API to fetch the weather
                const language = "en";
                const weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=${language}`;
                https.get(weatherApiURL, (HttpsResponse) => {
                    HttpsResponse.on("data", (data) => {
                        const JSONResponse = JSON.parse(data);
                        res.write(`<p><h2>The Weather report @<b>${location}</b> is:</h2><br/>`)
                        res.write(`Temperature : ${JSONResponse.main.temp} Celsius<br/>`)
                        res.write(`Humidity : ${JSONResponse.main.humidity}%<br/>`)
                        res.write(`Wind Speed : ${JSONResponse.wind.speed} km/h<br/>`)
                        let desc = JSONResponse.weather[0].description
                        res.write(`Description : ${desc.charAt(0).toUpperCase() + desc.slice(1)}<br/><br/>`)
                        res.write("<a href='/weather'>Go To Home</a></p>")
                        res.send()
                    })
                })
            }
            else {
                res.redirect("/weather");
            }
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

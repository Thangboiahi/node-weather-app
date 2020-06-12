const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectory = path.join(__dirname,  "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup static directory to serve
app.use(express.static(publicDirectory));

// Setup handlebars engine and views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath); 

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "DD"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "DD",
    message: "This is a project from a Node js course in Udemy"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "DD",
    message: "Type the address of the place whose temperature forecast you want to find out in the search box of the homepage."
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!"
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "DD",
    message: "Help article not found."
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "DD",
    message: "Page not found."
  });
});

app.listen(port, () => {
  console.log(`Started server on port ${port}...`);
});
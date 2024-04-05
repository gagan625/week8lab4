const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");

const locationAPI = require("./controllers/locationAPIController");
const locationSSR = require("./controllers/locationSSRController");

//Important: will be discussed next week
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//https://expressjs.com/en/resources/middleware/method-override.html
app.use(methodOverride('_method'))

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

// SSR
// Route to render index.html with locations using EJS
app.get("/", locationSSR.renderlocations);
// Define a route to render the addlocation.ejs view
app.get("/addlocation", locationSSR.renderForm);
// Route to add  location using EJ
app.post("/addlocation", locationSSR.addlocation);
// Define a route to render the singlelocation.ejs view
app.get("/single-location/:id", locationSSR.renderlocation);

// API
// GET all locations
//app.get("/api/locations", blogAPI.getlocations);
// POST a new location
//app.post("/api/locations", blogAPI.addlocation);
// GET a single location
//app.get("/api/locations/:id", blogAPI.getlocation);
// Update location using PUT
//app.put("/api/locations/:id", blogAPI.updatelocation);
// DELETE a location
//app.delete("/api/locations/:id", blogAPI.deletelocation);
// DELETE all location
//app.delete("/api/locations", blogAPI.deleteAlllocations);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
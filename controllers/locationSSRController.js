const location = require("../models/locationModel");

// Render Controller: Render index.html with locations using EJS
const renderlocations = async (req, res) => {
  try {
    const locations = await location.find({});
    res.render("index", { locations }); // Render index.ejs with locations data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};
 
// Get location by ID
const renderlocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await location.findById(id);
    if (!location) {
      return res.render("notfound");
    }
    res.render("singlelocation", { location }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering location:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addlocation"); // Assuming "addlocation.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new location (used for rendering and API)
const addlocation = async (req, res) => {
  try {
    const { title, description, targetDate } = req.body;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "on";
    const newlocation = new location({ title, description, targetDate, achieved });
    await newlocation.save();
    // Redirect to the main page after successfully adding the location
    console.log("location added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).render("error");
  }
};


module.exports = {
  renderlocations,
  renderlocation,
  addlocation,
  renderForm,
};
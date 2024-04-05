const location = require("../models/locationModel");

// get all locations
const getlocations = async (req, res) => {
  try {
    const locations = await location.find({});
    res.status(200).json(locations);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one location
const addlocation = async (req, res) => {
  // console.log();
  try {
    const { title, description, targetDate, achieved } = req.body;
    const newlocation = new location({ title, description, targetDate, achieved });
    await newlocation.save();
    res.status(201).json(newlocation);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get location by ID
const getlocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await location.findById(id);
    if (!location) {
      return res.status(404).json({ message: "location not found" });
    }
    res.status(200).json(location);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete location by ID
const deletelocation = async (req, res) => {
  try {
    const { id } = req.params;
    const location = await location.findByIdAndDelete({ _id: id });
    if (!location) {
      return res.status(404).json({ message: "location not found" });
    }
    res.status(200).json({ message: "location deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all locations
const deleteAlllocations = async (req, res) => {
  try {
    const result = await location.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update location by ID
const updatelocation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedlocation = req.body;
    // const location = await location.findOneAndUpdate({ _id: id }, updatedlocation);
    const location = await location.findOneAndUpdate({ _id: id }, updatedlocation, { new: true });

    if (!location) {
      return res.status(404).json({ message: "location not found" });
    }
    res.status(200).json(location);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getlocations,
  addlocation,
  getlocation,
  deletelocation,
  deleteAlllocations,
  updatelocation,
};
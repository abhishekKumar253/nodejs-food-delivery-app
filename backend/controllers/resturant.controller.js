import Resturant from "../models/resturant.model.js";

// CREATE RESTURANT
export const createRestaurant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      location,
    } = req.body;

    // validation
    if (!title || !location) {
      return res.status(400).send({
        success: false,
        message: "please provide title and location",
      });
    }

    const newResturant = new Resturant({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      location,
    });

    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "New Resturant Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in createResturant",
      error,
    });
  }
};

// get all resturant
export const getAllResturant = async (req, res) => {
  try {
    const resturants = await Resturant.find({});
    if (!resturants) {
      return res.status(402).send({
        success: false,
        message: "No resturant availible",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: resturants.length,
      resturants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAllResturant",
      error,
    });
  }
};

// GET RESTURNAT BY ID
export const getRestaurantById = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(402).send({
        success: false,
        message: "Please provide resturant Id",
      });
    }

    // find resturant
    const resturant = await Resturant.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "no resturant found",
      });
    }

    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getResturantById",
      error,
    });
  }
};

// delete restrurant
export const deleteRestaurant = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(400).send({
        success: false,
        message: "No resturant found or provide resturant Id",
      });
    }

    await Resturant.findOneAndDelete(resturantId);
    res.status(200).send({
      success: false,
      message: "resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete resturant",
      error,
    });
  }
};

import Foods from "../models/food.model.js";
import Order from "../models/order.model.js";

// CREATE FOOD
export const createFood = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;

    if (!title || !description || !price || !resturnat) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const newFood = new Foods({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    });

    await newFood.save();

    res.status(201).send({
      success: true,
      message: "Food created successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create food",
      error,
    });
  }
};

// GET ALLL FOODS
export const getAllfoods = async (req, res) => {
  try {
    const foods = await Foods.find({});
    if (!foods) {
      return res.status(400).send({
        success: false,
        message: "no food items was found",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAllfood",
      error,
    });
  }
};

// GET SINGLE FOOD
export const getSinglefoods = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(402).send({
        success: false,
        message: "Please provide id",
      });
    }
    const food = await Foods.findById(foodId);
    if (!food) {
      return res.status(400).send({
        success: false,
        message: "No food found with his id",
      });
    }

    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getsinglefood",
      error,
    });
  }
};

// GET FOOD BY RESTURANT
export const getFoodByRestaurants = async (req, res) => {
  try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(402).send({
        success: false,
        message: "Please provide id",
      });
    }

    const food = await Foods.find({ resturant: resturantId });
    if (!food) {
      return res.status(400).send({
        success: false,
        message: "No food found with htis id",
      });
    }
    res.status(200).send({
      success: true,
      message: "food base on resturant",
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getfoodbyRestaurants",
      error,
    });
  }
};

// UPDATE FOOD ITEM
export const updatefood = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(401).send({
        success: false,
        message: "no food id was found",
      });
    }
    const food = await Foods.findById(foodId);
    if (!food) {
      return res.status(401).send({
        success: false,
        message: "No food found",
      });
    }
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;
    const updatedFood = await Foods.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        resturnat,
        rating,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food item was updates",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update food",
      error,
    });
  }
};

// DELETE FOOD
export const deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(400).send({
        success: false,
        message: "provide food id",
      });
    }
    const food = await Foods.findById(foodId);
    if (!food) {
      return res.status(401).send({
        success: false,
        message: "No food found with id",
      });
    }
    await Foods.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food item Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete food",
      error,
    });
  }
};

// PLACE ORDER
export const placeOrder = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(401).send({
        success: false,
        message: "please food cart or payment method",
      });
    }
    let total = 0;

    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new Order({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in placeorder",
      error,
    });
  }
};

// CHANGE ORDER STATUS
export const orderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide valid order id",
      });
    }
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in orderstatus",
      error,
    });
  }
};

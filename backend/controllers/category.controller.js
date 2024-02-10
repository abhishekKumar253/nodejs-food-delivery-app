import Category from "../models/category.model.js";

// CREATE CAT
export const createCat = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      return res.status(400).send({
        success: false,
        message: "please provide category title or image",
      });
    }

    const newCategory = new Category({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create cat",
      error,
    });
  }
};

// GET ALL CAT
export const getAllCat = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories) {
      return res.status(401).send({
        success: false,
        message: "No Categories found",
      });
    }

    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAllcat",
      error,
    });
  }
};

// UPDATE CATE
export const updateCat = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(402).send({
        success: false,
        message: "No Category found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updateCat",
      error,
    });
  }
};

// DLEETE CAT
export const deleteCat = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide category ID",
      });
    }
    const category = await Category.findById(id);
    if (!category) {
      return res.status(400).send({
        success: false,
        message: "No category found with this id",
      });
    }
    await Category.findOneAndDelete(id);
    res.status(200).send({
      success: true,
      message: "category Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deletecat",
      error,
    });
  }
};

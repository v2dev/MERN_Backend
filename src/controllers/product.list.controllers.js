import { Product } from "../models/product.models.js";

export const createProduct = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // ✅ debug
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



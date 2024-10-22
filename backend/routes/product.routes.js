import express from "express";
import {
  addToCart,
  createProduct,
  getCart,
  payed,
  removeItemFromCart,
} from "../controller/product.controller.js";
import upload from "../utils/multer.js";
import multer from "multer";
import { getProducts } from "../controller/product.controller.js";

const router = express.Router();

router.post("/createProducts", (req, res, next) => {
  upload.any()(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Handle Multer-specific errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ error: "File size exceeds the 100MB limit." });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Handle unknown errors
      console.log(err);
      return res.status(500).json({ error: "An unknown error occurred." });
    }
    // Proceed to your controller if no errors
    createProduct(req, res, next);
  });
});

router.get("/getProducts", getProducts);
router.get("/addProduct/:id", addToCart);
router.get("/getCart", getCart);
router.get("/removeFromCart/:id", removeItemFromCart);
router.get("/payed", payed);

export default router;

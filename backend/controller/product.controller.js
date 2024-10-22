import Cart from "../models/Cart.model.js";
import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    const products = [];

    for (const file of req.files) {
      const newProduct = new Product({
        name: "Change Name",
        category: req.body.category,
        price: Math.floor(Math.random() * (800 - 100 + 1)) + 100,
        image: file.path,
      });
      const savedProduct = await newProduct.save();
      products.push(savedProduct);
    }

    res.status(200).json({ result: "Products created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { gender } = req.query;

    if (!gender || gender === "Unisex") {
      const products = await Product.find();
      res.status(200).json(products);
    } else if (gender === "Men") {
      const products = await Product.find({ category: "Men" });
      res.status(200).json(products);
    } else if (gender === "Women") {
      const products = await Product.find({ category: "Women" });
      res.status(200).json(products);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.session.userId;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    cart.items.push(id);

    await cart.save();

    res.status(200).json({ result: "Added Sucessfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.session.userId;

    let cart = await Cart.findOne({ userId }).populate("items");
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const removeItemFromCart = async (req, res) => {
  try {
    const userId = req.session.userId;
    const itemId = req.params.id;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    // Find the index of the first occurrence of the item
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    // Check if the item exists in the cart
    if (itemIndex !== -1) {
      // Remove the item at the found index
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json({ result: "Removed Successfully" });
    } else {
      return res.status(404).json({ error: "Item not found in cart" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const payed = async (req, res) => {
  try {
    const user = req.session.userId;
    const cart = await Cart.findOne({ userId: user });

    cart.items = [];

    await cart.save();

    return res.status(200).json({ result: "Order will be delivered soon" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

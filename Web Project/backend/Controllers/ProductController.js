const Product = require("../Models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products && products.length > 0) {
      res.status(200).json({ products: products });
    } else {
      res.status(404).json({ msg: "No products found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error on getting products" });
  }
};
const getOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const foundProduct = await Product.findById(id);
    if (foundProduct) {
      res.status(200).json({ product: foundProduct });
    } else {
      res.status(404).json({ msg: "No product found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error on retrieving the product" });
  }
};



const postProduct = async (req, res) => {
  const product = req.body;
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    res
      .status(200)
      .json({ product: newProduct, msg: "Product successfully added" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error on adding product" });
  }
};




const putProduct = async (req, res) => {
  const id = req.params.id;
  const product = req.body;
  try {
    await Product.findByIdAndUpdate(id, product);
    res.status(200).json({ msg: "update success" });
  } catch (error) {
    res.status(500).json({ msg: "error on updating product" });
  }
};


const addStock = async (req, res) => {
  const id = req.params.id;
const amount = req.body.amount;
  try {
    const updated = await Product.findByIdAndUpdate(
      id,
      { $inc: { stock: amount } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json({
      msg: "Stock increased",
      product: updated,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error increasing stock" });
  }
};

const removeStock = async (req, res) => {
  const id = req.params.id;
  const amount = req.body.amount;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (product.stock < amount) {
      return res.status(400).json({ msg: "Not enough stock" });
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      { $inc: { stock: -amount } },
      { new: true }
    );

    res.status(200).json({
      msg: "Stock decreased",
      product: updated,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error decreasing stock" });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ msg: "delete done" });
  } catch (error) {
    res.status(500).json({ msg: "error on deleting product" });
  }
};

module.exports = {
  getProducts,
  getOneProduct,
  postProduct,
  putProduct,
  deleteProduct,
  addStock,
  removeStock,
};
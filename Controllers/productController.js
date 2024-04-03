const Products = require("../modals/Products");


// Api http://localhost:8080/api/products
const getProductController = async (req, res) => {
    try {
        const products = await Products.find();
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
// Api http://localhost:8080/api/addproducts
const addProductController = async (req, res) => {
    try {
        const { name, desc, price, category, image1, image2, image3 } = req.body;
        const newProduct = new Products({ name, desc, price, category, image1, image2, image3 });
        await newProduct.save();
        return res.status(200).json({ message: "Product Added", success: true })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Api http://localhost:8080/api/deleteproduct/:id
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Products.findByIdAndDelete(id);
        return res.status(200).json({ message: "Product Deleted", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

}

module.exports = { getProductController, addProductController, deleteProduct };
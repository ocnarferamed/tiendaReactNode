const Product = require('../models/product');
const productController = {};

productController.getProducts = async (req,res)=>{
    const products = await Product.find();
    res.json(products);

};


productController.updateProducts = async (req,res)=>{
    const id = req.params.id;
    console.log(req.body)
    const newStock = req.body.stock;
    console.log(id,newStock)
    await Product.findOneAndUpdate({_id: id}, {stock:newStock}, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
    
        res.json({
            status:" Product updated"
        })
    });
};

module.exports = productController;
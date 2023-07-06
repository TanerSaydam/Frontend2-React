const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    _id: String,
    name: String,
    price: Number,
    stock: Number,
    sellerId: String,
    imageUrls: Array,
    mainImageUrl: String
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
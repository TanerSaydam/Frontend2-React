import mongoose from "mongoose";

const shoppingCartSchema = new mongoose.Schema({
    _id: String,
    userId: String,
    productId: String,
    quantity: Number,
});

export default mongoose.models.ShoppingCart || mongoose.model("ShoppingCart", shoppingCartSchema);

const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    _id: String,
    userId: String,
    productId: String,
    quantity: Number,
    price: Number,
    date: Date,
    status: String,
    isCompleted: Boolean,
    isReject: Boolean,
    isPaymentCompleted: Boolean,
    rate: Number,
    comment: String,
    trackingNumber: String
});

export default mongoose.models.Order || mongoose.model("Order",orderSchema);
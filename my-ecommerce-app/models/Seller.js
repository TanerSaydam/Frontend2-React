import mongoose from 'mongoose'

const sellerSchema = new mongoose.Schema({
    _id: String,
    name: {type: String, required: true, unique: true},
    identityNumber: {type: Number, required: true, unique: true},
    address: String,
    city: String,
    email: String,
    phoneNumber: String,
    password: String,
    imageUrl: String,
    isAdmin: Boolean
});

export default mongoose.models.Seller || mongoose.model("Seller",sellerSchema);
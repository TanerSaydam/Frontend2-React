import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({    
    work: String,
    isCompleted: Boolean,
    date: Date
});

export default mongoose.models.Todo || mongoose.model("Todo",todoSchema);
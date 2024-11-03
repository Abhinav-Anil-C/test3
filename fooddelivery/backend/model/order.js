const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    food: {
        type: mongoose.Types.ObjectId,
        ref: "food",  // Change "user" to "food" if that's what you intended
    },
    status: {
        type: String,
        default: "Order is placed",  // Default should match one of the enum values
        enum: ["Order is placed", "Out for delivery", "Delivered", "Canceled"], 
    },
}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema);

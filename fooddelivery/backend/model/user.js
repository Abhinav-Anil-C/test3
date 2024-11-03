const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favourites: [{
        type: mongoose.Types.ObjectId,  // Capital "O" in ObjectId
        ref: "foods",
    }],
    cart: [{
        type: mongoose.Types.ObjectId,  // Capital "O" in ObjectId
        ref: "foods",
    }],
    orders: [{
        type: mongoose.Types.ObjectId,  // Capital "O" in ObjectId
        ref: "order",
    }],
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);

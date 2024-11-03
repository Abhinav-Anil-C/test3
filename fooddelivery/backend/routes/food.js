const router = require("express").Router();
const User = require("../model/user");
const Food = require("../model/food");
const { authenticateToken } = require("./userAuth");
const jwt = require("jsonwebtoken");


//add food --admin
router.post("/add-food", authenticateToken , async(req, res)=>{
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return res
            .status(400)
            .json({message: "You are not having access to perform admin work"});
        }
        const food= new Food({
            url: req.body.url,
            name: req.body.name,
            price: req.body.price,
        });
        await food.save();
        res.status(200).json({message:"Food added successfully"});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update food
router.put("/update-food", authenticateToken, async (req, res) => {
    try {
        const { foodid } = req.body; // Change this to req.body or req.params if needed
        if (!foodid) {
            return res.status(400).json({ message: "Food ID is required" });
        }

        const updatedFood = await Food.findByIdAndUpdate(foodid, {
            url: req.body.url,
            name: req.body.name,
            price: req.body.price,
        }, { new: true }); // Option to return the updated document

        if (!updatedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }

        return res.status(200).json({ message: "Food updated successfully", food: updatedFood });
    } catch (error) {
        console.error("Error updating food:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

//delete food
router.delete("/delete-food", authenticateToken, async( req, res)=>{
    try {
        const {foodid} = req.body;
        await Food.findByIdAndDelete(foodid);
        return res.status(200).json({message:"Food deleted successfully"});
    } catch (error) {
            return res.status(500).json({message:"An error occurred"});
        }
});

//get all foods
router.get("/get-all-foods", async (req, res)=>{
    try {
        const foods = await Food.find().sort({ createdAt: -1});
        return res.json({
            status:"Success",
            data: foods,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});

//get recently added food limit 4
router.get("/get-recent-foods", async (req, res)=>{
    try {
        const foods = await Food.find().sort({ createdAt: -1}).limit(4);
        return res.json({
            status:"Success",
            data: foods,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});


//get food by id
router.get("/get-food-by-id/:id", async(req, res)=>{
    try {
        const {id}= req.params;
        const food = await Food.findById(id);
        return res.json({
            status:"Success",
            data: food,
        });
    } catch (error) {
        console.log(error);
        return  res.status(500).json({message:"An error occurred"});
    }
});



module.exports = router;

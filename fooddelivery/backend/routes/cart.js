const router = require("express").Router();
const User = require("../model/user");
const { authenticateToken} = require("./userAuth");

//add food to cart
router.put("/add-to-cart", authenticateToken, async (req, res)=>{
    try {
        const {foodid, id} = req.headers;
        const userData = await User.findById(id);
        const isFoodinCart = userData.cart.includes(foodid);
        if(isFoodinCart){
            return res.json({
                status:"Success",
                message:"Food is already in cart",
            });
        }
        await User.findByIdAndUpdate(id, {$push:{cart:foodid},});
        return res.json({
            status:"Success",
            message: "Food added to cart",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});

//remove from cart 
router.put("/remove-from-cart/:foodid", authenticateToken, async(req, res)=>{
    try {
        const {foodid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id, {$pull:{cart:foodid},});
        return res.json({
            status:"Success",
            message:"Food removed from cart",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});

//get cart of a particular user
router.get("/get-user-cart", authenticateToken, async(req, res)=>{
    try {
        const {id}=req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();

        return res.json({
            status:"Success",
            data: cart,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred"});
    }
});
module.exports = router;
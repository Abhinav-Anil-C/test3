const router = require("express").Router();
const User = require("../model/user");
const { authenticateToken} = require("./userAuth");

//add food to favourite
router.put("/add-food-to-favourite", authenticateToken, async (req, res)=>{
    try {
        const {foodid, id} = req.headers;
        const userData = await User.findById(id);
        const isFoodFavourite = userData.favourites.includes(foodid);
        if(isFoodFavourite){
            return res.status(200).json({message:"Food is already in favourites"});
        }
        await User.findByIdAndUpdate(id,{$push:{favourites: foodid}});
        return res.status(200).json({message:"Food added to favourites"})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

//remove food to favourite
router.put("/remove-food-from-favourite", authenticateToken, async (req, res)=>{
    try {
        const {foodid, id} = req.headers;
        const userData = await User.findById(id);
        const isFoodFavourite = userData.favourites.includes(foodid);
        if(isFoodFavourite){
            await User.findByIdAndUpdate(id,{$pull:{favourites: foodid}});
        }
        
        return res.status(200).json({message:"Food removed from favourites"});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

//get Favourite foods of a perticular user
router.get("/get-favourite-foods", authenticateToken, async(req, res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteFoods = userData.favourites;
        return res.json({
            status:"Success",
            data: favouriteFoods,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});

module.exports = router;
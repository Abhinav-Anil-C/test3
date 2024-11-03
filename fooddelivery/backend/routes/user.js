const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

// Sign-up route
router.post("/sign-up", async (req, res) => {
    console.log("Sign-up request received");
    try {
        const { username, email, password, address } = req.body;

        if (username.length < 4) {
            return res.status(400).json({ message: "Username length should be greater than 3" });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length < 5) {
            return res.status(400).json({ message: "Password length should be greater than 5" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashPass,
            address
        });

        await newUser.save();
        return res.status(200).json({ message: "Sign-Up Successfully" });
    } catch (error) {
        console.error("Sign-up error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Sign-in route
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const match = await bcrypt.compare(password, existingUser.password);
        if (match) {
            const authClaims = {
                _id: existingUser._id, // Include user ID in claims
                username: existingUser.username,
                role: existingUser.role,
            };

            const token = jwt.sign(
                { _id: existingUser._id, username: existingUser.username, role: existingUser.role },
                "foodstore123",
                { expiresIn: "30d" }
            );
            

            return res.status(200).json({
                id: existingUser._id,
                role: existingUser.role,
                token,
                message: "SignIn Success"
            });
        } else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        console.error("Sign-in error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get user information
// router.get("/get-user-information", authenticateToken, async (req, res) => {
//     try {
//         const userId = req.user.authClaims._id; // Use ID from the token
//         const data = await User.findById(userId).select("-password");
//         return res.status(200).json(data);
//     } catch (error) {
//         console.error("Error getting user information:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// });

// Get user information
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const userId = req.headers["id"]; // Retrieve user ID from the headers

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const data = await User.findById(userId).select("-password");

        // Check if user was found
        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User information retrieved successfully", data });
    } catch (error) {
        console.error("Error getting user information:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


// Update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.authClaims._id; // Use ID from the token
        const { address } = req.body;

        await User.findByIdAndUpdate(userId, { address });
        return res.status(200).json({ message: "Address updated successfully" });
    } catch (error) {
        console.error("Error updating address:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

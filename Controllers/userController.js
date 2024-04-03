const Auth = require("../modals/Auth");
const bcrypt = require("bcryptjs");
const createSecretToken = require("../utils/secretToken");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.TOKEN_KEY;

// Api = http://localhost:8080/api/signup
const signupController = async (req, res) => {
    // Code for signup.
    try {
        const { name, email, password, cPassword } = req.body;
        if (!name || !email || !password || !cPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== cPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" });
        }
        const userExists = await Auth.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Code for saving user data to database
        const user = new Auth({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: "User registered successfully", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Api = http://localhost:8080/api/login
const loginController = async (req, res) => {
    // Code for login
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = createSecretToken(user._id, user.isAdmin);
        res.cookie('token', token, { httpOnly: false, withCredentials: true });
        return res.status(200).json({ message: "Login successful", success: true, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


// Api = http://localhost:8080/api/signout
const signoutController = async (req, res) => {
    // Code for signout
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Signout successful", success: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// Api = http://localhost:8080/api/verify
const verifyUser = async (req, res, next) => {
    // Code for verifying user
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const user = jwt.verify(token, secret);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
}

// Api = http://localhost:8080/api/user
const getUserData = async (req, res) => {
    // Code for getting user data
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const user = jwt.verify(token, secret);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const userData = await Auth.findById(user.id);
        if (!userData) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        return res.status(200).json({ message: "User found", success: true, data: userData });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


const verifyAdmin = async (req, res, next) => {
    // Code for verifying admin
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const user = jwt.verify(token, secret);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        if (!user.admin) {
            return res.status(403).json({ message: "Forbidden", success: false });
        }
        return next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}



module.exports = { loginController, signupController, signoutController, getUserData, verifyUser, verifyAdmin };
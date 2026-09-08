const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { cookieOptions, clearCookieOptions } = require("../utils/cookieOptions");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
const publicUser = (user) => ({ _id: user._id, name: user.name, email: user.email });
const validate = ({ name, email, password }, registration = false) => {
    if (registration && (!name || typeof name !== "string" || name.trim().length < 2)) return "Name must contain at least 2 characters";
    if (!email || typeof email !== "string" || !emailPattern.test(email.trim())) return "A valid email is required";
    if (!password || typeof password !== "string" || password.length < 8) return "Password must contain at least 8 characters";
    return null;
};

const setAuthCookie = (res, user) => res.cookie("token", generateToken(user._id), cookieOptions);

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const validationError = validate({ name, email, password }, true);
        if (validationError) return res.status(422).json({ message: validationError });
        const normalizedEmail = email.trim().toLowerCase();
        if (await User.findOne({ email: normalizedEmail })) return res.status(409).json({ message: "User already exists" });
        const user = await User.create({ name: name.trim(), email: normalizedEmail, password });
        setAuthCookie(res, user);
        return res.status(201).json({ message: "User registered successfully", user: publicUser(user) });
    } catch (error) {
        if (error.code === 11000) return res.status(409).json({ message: "User already exists" });
        console.error("Registration failed:", error.message);
        return res.status(500).json({ message: "Registration failed" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validationError = validate({ email, password });
        if (validationError) return res.status(422).json({ message: validationError });
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user || !(await user.comparePassword(password))) return res.status(401).json({ message: "Invalid credentials" });
        setAuthCookie(res, user);
        return res.status(200).json({ message: "Login successful", user: publicUser(user) });
    } catch (error) {
        console.error("Login failed:", error.message);
        return res.status(500).json({ message: "Login failed" });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("token", clearCookieOptions);
    return res.status(200).json({ message: "Logout successful" });
};

module.exports = { registerUser, loginUser, logoutUser };

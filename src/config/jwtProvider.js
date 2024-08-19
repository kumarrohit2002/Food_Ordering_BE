const jwt =require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = async(userId) => {
    const token =await jwt.sign({ userId: userId }, SECRET_KEY, { expiresIn: "48h" });
    return token;
};

const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        return decodedToken.userId;
    } catch (err) {
        console.error("Invalid or expired token");
        return null; // or throw an error based on your use case
    }
};

module.exports = { generateToken, getUserIdFromToken };

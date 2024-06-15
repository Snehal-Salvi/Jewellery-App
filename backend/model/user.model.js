// Define Mongoose schema and model for User with username, email, and password fields
import mongoose from "mongoose";

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
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

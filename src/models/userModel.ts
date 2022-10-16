import mongoose, { Schema } from "mongoose";

type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    mobile: number;
    password: string;
    active: boolean;
    verificationCode: string;
};

const userSchema = new Schema<UserData>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: Number, required: true },
        password: { type: String, required: true },
        active: { type: Boolean, required: true },
        verificationCode: { type: String, required: true, unique: true }
    },
    { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;

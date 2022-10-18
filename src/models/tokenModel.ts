import mongoose, { Schema } from "mongoose";


const tokenSchema = new Schema({
 userId: {type: Schema.Types.ObjectId, required: true, ref: "user"},
 token: {type: String, required: true},
 createdAt:{ type: Date, default: Date.now, expires: 3600}
})

export const tokens = mongoose.model("token", tokenSchema);
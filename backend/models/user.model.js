
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "recruiter"], required: true },
    profile: {
        bio: { type: String },
        skills: { type: [String] },
        resume: { type: String },  // Google Drive link will be stored here
        resumeOriginalName: { type: String },  // Optional field to store the original name if needed
        company: { type: mongoose.Types.ObjectId, ref: 'Company' },
        profilePhoto: { type: String, default: "" }  // Optional field for profile photo
    },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);


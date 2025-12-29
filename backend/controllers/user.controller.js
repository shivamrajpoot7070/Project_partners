import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    console.log("REGISTER REQ BODY:", req.body);
    // ✅ Handle CORS preflight safely
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }

    const { fullname, email, phoneNumber, password, role } = req.body;

    // ✅ Basic validation
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullname)}`,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } 
  catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            });
        };

        // Check if role matches
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            });
        };

        // Create token
        const tokenData = {
            userId: user._id
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Prepare user object
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        // Set cookie and return response with token
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true, // Prevent JavaScript access
                sameSite: 'strict' // Prevent CSRF attacks
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                token, // Include the bearer token in the response
                success: true
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills, resumeLink } = req.body; // Accept resumeLink

        console.log(fullname, email, phoneNumber, bio, skills, resumeLink); // Log the inputs

        let cloudResponse;

        const file = req.file;

        console.log(file);

        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }
        else {
            console.log("No file uploaded for profile photo");
        }

        let skillsArray;

        if (skills){
            skillsArray = skills.split(",").map(skill => skill.trim());
        }

        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        // Updating user details
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        // If Google Drive link for resume is provided, save it
        if (resumeLink) {
            user.profile.resume = resumeLink; // Save the Google Drive link
            user.profile.resumeOriginalName = "Google Drive Resume"; // Optionally, you can set this to something like "Google Drive Resume"
        }
        // If a new profile photo was uploaded, save it
        if (cloudResponse) {
            user.profile.profilePhoto = cloudResponse.secure_url; // Save the Cloudinary URL
        }
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });
    }
     catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
//import { singleUpload } from "../middlewares/mutler.js";
import { singleUpload } from "../middleware/multer.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);  // single upload is router
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

// is authenticated fucntion me jake check hoga ky cookies me data hai uska agr hai tbhi update nai to ni
export default router;
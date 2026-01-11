import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
 
const router = express.Router();

router.options("/register", (req, res) => res.sendStatus(200));

router.route("/register").post(register);  // single upload is router
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").patch(isAuthenticated,updateProfile);

// is authenticated fucntion me jake check hoga ky cookies me data hai uska agr hai tbhi update nai to ni
export default router;
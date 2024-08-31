import express from "express";
import multer from "multer";
import { body, param, query } from "express-validator";
import {
  registerUser,
  updateUser,
  deleteUser,
  searchUsers,
  getAllUsers,
} from "../controlers/usrControler.js";
import { requiredSignin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer storage configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpg|jpeg|png$/i)) {
      return cb(new Error("Only jpg and png files are allowed!"), false);
    }
    cb(null, true);
  },
});

// Validation middleware for update and delete operations
const validateObjectId = param("id").isMongoId().withMessage("Invalid user ID");

// Register a new user
router.post(
  "/register",
  upload.single("image"),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("userName").isEmail().withMessage("Valid email is required"),
    body("mobileNo")
      .isNumeric()
      .isLength({ min: 10, max: 10 })
      .withMessage("Mobile number must be 10 digits"),
    body("designation")
      .isIn(["HR", "Manager", "Developer"])
      .withMessage("Invalid designation"),
    body("gender").isIn(["M", "F"]).withMessage("Gender must be M or F"),
    body("courses")
      .isArray({ min: 1 })
      .withMessage("At least one course must be selected")
      .custom((courses) => {
        const allowedCourses = ["MCA", "BCA", "BSC", "B.Tech", "M.Tech"];
        const invalidCourses = courses.filter(
          (course) => !allowedCourses.includes(course)
        );
        if (invalidCourses.length > 0) {
          throw new Error("Invalid course(s) selected");
        }
        return true;
      }),
  ],
  requiredSignin,
  registerUser
);

// Update an existing user by ID
router.put(
  "/:id",
  upload.single("image"),
  [
    validateObjectId,
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("userName")
      .optional()
      .isEmail()
      .withMessage("Valid email is required"),
    body("mobileNo")
      .optional()
      .isNumeric()
      .isLength({ min: 10, max: 10 })
      .withMessage("Mobile number must be 10 digits"),
    body("designation")
      .optional()
      .isIn(["HR", "Manager", "Developer"])
      .withMessage("Invalid designation"),
    body("gender")
      .optional()
      .isIn(["M", "F"])
      .withMessage("Gender must be M or F"),
    body("courses")
      .optional()
      .isArray({ min: 1 })
      .withMessage("At least one course must be selected")
      .custom((courses) => {
        const allowedCourses = ["MCA", "BCA", "BSC", "B.Tech", "M.Tech"];
        const invalidCourses = courses.filter(
          (course) => !allowedCourses.includes(course)
        );
        if (invalidCourses.length > 0) {
          throw new Error("Invalid course(s) selected");
        }
        return true;
      }),
  ],
  requiredSignin,
  updateUser
);

// Delete an existing user by ID
router.delete("/:id", validateObjectId, deleteUser);

// Search for users by criteria
router.get(
  "/search",
  [
    query("id").optional().isMongoId().withMessage("Invalid user ID"),
    query("name").optional().isString(),
    query("designation").optional().isIn(["HR", "Manager", "Developer"]),
    query("course").optional().isIn(["MCA", "BCA", "BSC", "B.Tech", "M.Tech"]),
  ],
  requiredSignin,
  searchUsers
);

router.get("/all", requiredSignin, getAllUsers);

export default router;

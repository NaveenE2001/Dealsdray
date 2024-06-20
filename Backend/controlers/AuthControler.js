import JWT from "jsonwebtoken";
import { comparedpassword, hashedpassword } from "../healper/authHealper.js";
import AuthSchema from "../modules/Auth.js";

const JWT_SEC = "naveen@";

// Signin Controller
export const SigninControler = async (req, res) => {
  try {
    const { name, userName, password } = req.body;
    console.log(userName, password);

    const existingUser = await AuthSchema.findOne({ userName });
    if (existingUser) {
      return res.status(402).send({
        success: false,
        message: "Email ID already exists, please login",
      });
    }

    const hashedPassword = await hashedpassword(password);
    const user = new AuthSchema({
      name,
      userName,
      password: hashedPassword,
    });
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Successfully registered",
      user,
    });
    console.log(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Login Controller
export const LoginControler = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const existingUser = await AuthSchema.findOne({ userName });
    if (!existingUser) {
      return res.status(402).send({
        success: false,
        message: "Email ID does not exist, please signup",
      });
    }

    const isPasswordCorrect = await comparedpassword(
      password,
      existingUser.password
    );
    if (isPasswordCorrect) {
      const token = JWT.sign({ userId: existingUser._id }, JWT_SEC, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

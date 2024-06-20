import JWT from "jsonwebtoken";
const JWT_SEC = "naveen@";

export const requiredSignin = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.token, JWT_SEC);
    decode.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

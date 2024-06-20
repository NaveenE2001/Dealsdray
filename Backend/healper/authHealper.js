import bcrypt from "bcrypt";
const gensalt = 10;

export const hashedpassword = async (password) => {
  try {
    const hashedpassword = await bcrypt.hash(password, gensalt);
    return hashedpassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparedpassword = async (password, cpassword) => {
  return bcrypt.compare(password, cpassword);
};

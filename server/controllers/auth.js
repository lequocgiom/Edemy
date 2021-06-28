import User from "../models/user";
import { hashPassword } from "../utils/auth";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    // validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");

    //hash password
    const hasedPassword = await hashPassword(password);

    //register
    const user = new User({
      name,
      email,
      password: hasedPassword
    }).save();

    // console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again.");
  }
};

import authorModel from "../models/authorModel.js";
import { isEmpty, isValidName, isValidEmail, isValidObjectId, isValidPassword } from "../validator/validation.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createAuthor = async (req, res) => {
  try {
    let data = req.body;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "Data is required" });
    }

    let { fname, lname, title, email, password } = data;

    if (isEmpty(fname)) {
      return res
        .status(404)
        .send({ status: false, message: "fname is required" });
    }
    if (isEmpty(lname)) {
      return res
        .status(404)
        .send({ status: false, message: "lname is required" });
    }
    if (isEmpty(title)) {
      return res
        .status(404)
        .send({ status: false, message: "title is required" });
    }
    if (isEmpty(email)) {
      return res
        .status(404)
        .send({ status: false, message: "email is required" });
    }
    if (isEmpty(password)) {
      return res
        .status(404)
        .send({ status: false, message: "password is required" });
    }

    if (!isValidName(fname)) {
      return res.status(404).send({ status: false, message: "Invalid name" });
    }
    if (!isValidName(lname)) {
      return res.status(404).send({ status: false, message: "Invalid name" });
    }
    if (!isValidEmail(email)) {
      return res.status(404).send({ status: false, message: "Invalid email" });
    }
    if (!isValidPassword(password)) {
      return res
        .status(404)
        .send({ status: false, message: "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character." });
    }


    if (!["Mr", "Mrs", "Miss"].includes(title)) {
      return res
        .status(404)
        .send({
          status: false,
          message: "Title should only include 'Mr','Miss','Mrs'",
        });
    }

    email = email.toLowerCase();
    let checkEmail = await authorModel.findOne({ email: email });
    if (checkEmail) {
      return res
        .status(404)
        .send({ status: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    data.password = hashedPassword;

    const author = await authorModel.create(data);

    // const createdAuthor = await authorModel.findOne(author._id).select(
    //     "-password"
    // );

    author.password = undefined;

    return res
      .status(200)
      .send({
        status: true,
        message: "Author created successfully",
        data: author,
      });
  } catch (error) {
    return res.status(404).send({ status: false, message: error.message });
  }
};

const loginAuthor = async (req, res) => {
   
  try {
    const data = req.body;
    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Email and Password is required" });
    }

    let { email, password } = data;
    if (isEmpty(email)) {
      return res
        .status(400)
        .send({ status: false, message: "EmailId is mandatory" });
    }
    if (isEmpty(password)) {
      return res
        .status(400)
        .send({ status: false, message: "Password is mandatory" });
    }
  
    email = email.toLowerCase();
    console.log(email);
    const user = await authorModel.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(401).send({ status: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ status: false, message: "Invalid email or password" });
    }

   
    
    const token = jwt.sign(
      {
        authorId: user._id,
        email: user.email,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1d" }
    );

    user.password = undefined;
    console.log(user);

    return res.status(200).send({
      status: true,
      msg: "Token has been generated",
      token: token,
      data: user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: false, message: error.message });
  }
};

export { createAuthor, loginAuthor };

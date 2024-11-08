import jwt from 'jsonwebtoken';
import authorModel from '../models/authorModel.js';
import blogModel from '../models/blogModel.js';

const authenticate = async (req, res, next) => {
    try{
        const token = req.headers?.authorization?.split(' ')[1];
        console.log(token);
       
        if(!token){
            return res.status(401).send({status : false, message:"Token is required"});
        }
        
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

        // console.log(decodedToken);
        if(!decodedToken){
            return res.status(401).send({status : false, message:"Invalid token"});
        }

        const user = await authorModel.findById(decodedToken?.authorId).select("-password -refreshToken");

        // console.log(user);
        
        if(!user){
            return res.status(401).send({status : false, message:"User not found"});
        }

        // console.log("User found",user);

        req.user = user;    
        next();
    }catch(err){
      console.log(err);
        return res.status(401).send({status : false, message:err});
    }
}


const authorize = async function (req, res, next) {
    try {
      let authorLoggedIn = req.user._id.toString();
      let blogId = req.params.blogId;
  
      let idRegex = /^[a-f\d]{24}$/i;
      if (!blogId.match(idRegex))
        return res
          .status(400)
          .send({ status: false, msg: "Param Id(ObjectId) Must be 24 byte" });
  
      let checkBlogId = await blogModel.findById(blogId);
      if (!checkBlogId) {
        return res.status(404).send({ status: false, message: "Blog not Found" });
      }
      console.log(authorLoggedIn, blogId);
      if (checkBlogId.authorId != authorLoggedIn) {
        return res.status(403).send({
          status: false,
          msg: "loggedin author not allowed to modify changes",
        });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(500).send({ status: false, msg: err.messge });
    }
  };


  // ======> authorizeByQuery <===========
const authorizeByQuery = async function (req, res, next) {
    try {
      let authorLoggedIn = req.user._id.toString(); //Accessing authorId from attribute
  
      let conditions = req.query; //Checks if condition for deletion is coming or not
      if (Object.keys(conditions).length == 0) {
        return res
          .status(400)
          .send({ status: false, msg: "Provide information for deletion" });
      }
      if (conditions.authorId) {
        if (!conditions.authorId.match(/^[0-9a-f]{24}$/)) {
          return res
            .status(400)
            .send({ status: false, msg: "Not a valid ObjectId" });
        }
        if (conditions.authorId != authorLoggedIn) {
          return res
            .status(403)
            .send({ status: false, msg: "Author not authorised" });
        }
      }
      let authorAccessing = await blogModel.find({
        $and: [conditions, { isDeleted: false }],
      });
  
      if (authorAccessing.length == 0) {
        return res.status(404).send({ status: false, msg: "No Blogs Found" });
      }
  
      let accessedBlog = authorAccessing.filter(
        (blogs) => blogs.authorId == authorLoggedIn
      );
  
      if (accessedBlog.length == 0) {
        return res
          .status(403)
          .send({ status: false, msg: "User Not Authorised" });
      }
      req.id = authorLoggedIn; //attribute to store the author id from token
      next();
    } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
    }
  };


  export {authenticate, authorize, authorizeByQuery};
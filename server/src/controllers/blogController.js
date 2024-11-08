import blogModel from "../models/blogModel.js";
import authorModel from "../models/authorModel.js";
import { isEmpty, isValidName, isValidObjectId } from "../validator/validation.js";

const createBlog = async (req, res) => {
  console.log('hit');
  try {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .send({ status: "false", message: "Data is required" });
    }

    const authorId = req.user._id.toString();
    // console.log(authorId);
    const { title, body, tags, category, subcategory } = data;

    if (isEmpty(title)) {
      return res
        .status(400)
        .send({ status: "false", message: "Title must be present" });
    }

    if (isEmpty(body)) {
      return res
        .status(400)
        .send({ status: "false", message: "Body must be present" });
    }

    if (isEmpty(tags)) {
      return res
        .status(400)
        .send({ status: "false", message: "Tags must be present" });
    }

    if (isEmpty(category)) {
      return res
        .status(400)
        .send({ status: "false", message: "Category must be present" });
    }

    if (isEmpty(authorId)) {
      return res
        .status(400)
        .send({ status: "false", message: "AuthorId must be present" });
    }

    if (!isValidObjectId(authorId)) {
      return res.status(400).send({ status: false, msg: "Invalid authorId" });
    }

    if (!isValidName(title)) {
      return res
        .status(400)
        .send({ status: false, msg: "title should include alphabets only" });
    }
    if (!isValidName(category)) {
      return res
        .status(400)
        .send({ status: false, msg: "category should include alphabets only" });
    }

    if (tags || tags == "") {
      if (isEmpty(tags)) {
        return res
          .status(400)
          .send({ status: false, msg: "tags must be presnt" });
      }
    }

    if (subcategory || subcategory == "") {
      if (isEmpty(subcategory)) {
        return res
          .status(400)
          .send({ status: false, msg: "subcategory must be presnt" });
      }
    }

    const getAuthorData = await authorModel.findById(authorId);
    if (!getAuthorData) {
      return res
        .status(404)
        .send({ status: false, msg: `No author present by this ${authorId}` });
    }

    if (data["isPublished"] == true) {
      data["publishedAt"] = Date.now();
    }

    const createBlogs = await blogModel.create({...data, authorId});
    return res.status(201).send({
      status: "true",
      message: "Blog created successfully",
      data: createBlogs,
    });
  } catch (err) {
    console.log(err);
    return res.status(505).send({ status: "false", message: err });
  }
};


const getBlog = async (req, res) => {
  try {
    const data = req.query;
    // if (Object.keys(data).length === 0) {
    //   return res
    //     .status(400)
    //     .send({
    //       status: "false",
    //       message: "Please provide atleast one Query to fetch blog details",
    //     });
    // }


    let { category, authorId, tags, subcategory } = data;
    let filter = { isDeleted: false, isPublished: true };

    if (category || category == "") {
      if (isEmpty(category)) {
        return res
          .status(400)
          .send({ status: false, msg: "category must be present" });
      }
      filter.category = category;
    }

    if (authorId || authorId == "") {
      if (isEmpty(authorId)) {
        return res
          .status(400)
          .send({ status: false, msg: "authorId must be present" });
      }
      if (!isValidObjectId(authorId)) {
        return res.status(400).send({ status: false, msg: "Invalid blogId" });
      }
      filter.authorId = authorId;
    }

    if (tags) {
      if (tags.trim().length == 0) {
        return res.status(400).send({ status: false, msg: "Enter valid tags" });
      }
      tags = tags.split(",");
      filter.tags = { $in: tags };
    }

    if (subcategory) {
      if (subcategory.trim().length == 0) {
        return res
          .status(400)
          .send({ status: false, msg: "Enter valid subcategory" });
      }
      subcategory = subcategory.split(",");
      filter.subcategory = { $in: subcategory };
    }

    // const fetchBlogs = await blogModel.find(filter)

    // if need to fetch author details also then we can populating author
    const fetchBlogs = await blogModel.find(filter).populate('authorId');
    
    if (fetchBlogs.length == 0) {
      return res
        .status(404)
        .send({ status: false, msg: "Such Blogs Not Available" });
    }
    return res.status(200).send({ status: true, data: fetchBlogs });
  } catch (err) {
    return res.status(505).send({ status: "false", message: err });
  }
};


const updateBlog = async (req, res) => {
  console.log('hit');
  try {
    const blogId = req.params.blogId;
    const data = req.body;
    if (!isValidObjectId(blogId)) {
      return res.status(400).send({ status: false, msg: "Invalid blogId" });
    }

    let { title, body, tags, subcategory } = data;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "body Must be filled" });
    }
    if (title || title == "") {
      if (isEmpty(title)) {
        return res
          .status(400)
          .send({ status: false, msg: "title must be presnt" });
      }
      if (!isValidName(title)) {
        return res
          .status(400)
          .send({ status: false, msg: "title should include alphabets only" });
      }
    }
    if (body || body == "") {
      if (isEmpty(body)) {
        return res
          .status(400)
          .send({ status: false, msg: "body must be presnt" });
      }
    }
    if (tags || tags == "") {
      if (isEmpty(tags)) {
        return res
          .status(400)
          .send({ status: false, msg: "tags must be presnt" });
      }
      if (!isValidName(tags)) {
        return res
          .status(400)
          .send({ status: false, msg: "tags should include alphabets only" });
      }
    }
    if (subcategory || subcategory == "") {
      if (isEmpty(subcategory)) {
        return res
          .status(400)
          .send({ status: false, msg: "subcategory must be presnt" });
      }
      if (!isValidName(subcategory)) {
        return res.status(400).send({
          status: false,
          msg: "subcategory should include alphabets only",
        });
      }
    }
    const updateQuery = { title: title, body: body };
    const addQuery = { tags: tags, subcategory: subcategory };

    const filterBlogs = await blogModel.findOne({
      $and: [{ isDeleted: false }, { isPublished: true }],
    });
    if (!filterBlogs) {
      return res
        .status(404)
        .send({ status: false, msg: "No filter possible are available" });
    }

    const updatedblog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { $set: updateQuery, $push: addQuery, publishedAt: Date.now() },
      { new: true }
    );

    return res.status(200).send({
      status: true,
      msg: "Blog is Updated Successfully",
      data: updatedblog,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ status: "false", message: err });
  }
};


const getBlogById = async (req, res) => {
  try {
    const data = req.query;
    let { category, authorId, tags, subcategory } = data;
    let filter = { isDeleted: false, isPublished: true };

    // Category filter
    if (category !== undefined && category !== "") {
      if (isEmpty(category)) {
        return res.status(400).send({ status: false, msg: "Category must be provided" });
      }
      filter.category = category;
    }

    // AuthorId filter
    if (authorId !== undefined && authorId !== "") {
      if (isEmpty(authorId)) {
        return res.status(400).send({ status: false, msg: "authorId must be provided" });
      }
      if (!isValidObjectId(authorId)) {
        return res.status(400).send({ status: false, msg: "Invalid authorId" });
      }
      filter.authorId = authorId;
    }

    // Tags filter
    if (tags) {
      if (tags.trim().length == 0) {
        return res.status(400).send({ status: false, msg: "Enter valid tags" });
      }
      tags = tags.split(","); // Convert to array
      filter.tags = { $in: tags };
    }

    // Subcategory filter
    if (subcategory) {
      if (subcategory.trim().length == 0) {
        return res.status(400).send({ status: false, msg: "Enter valid subcategory" });
      }
      subcategory = subcategory.split(","); // Convert to array
      filter.subcategory = { $in: subcategory };
    }

    // Fetching blogs with the applied filters
    const fetchBlogs = await blogModel.find(filter).populate('authorId');

    // Handle no blogs found
    if (fetchBlogs.length == 0) {
      return res.status(404).send({ status: false, msg: "No blogs found with the provided filters" });
    }

    return res.status(200).send({ status: true, data: fetchBlogs });
  } catch (err) {
    console.log(err);
    return res.status(505).send({ status: false, message: err.message || "An error occurred" });
  }
};



// ============> Delete Blogs By blogId <==============

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    if (!isValidObjectId(blogId)) {
      return res.status(400).send({ status: false, msg: "Invalid blogId" });
    }
    const checkBlog = await blogModel.findById(blogId);
    if (!checkBlog) {
      return res
        .status(404)
        .send({ status: false, message: "no such blog exists" });
    }
    if (checkBlog.isDeleted) {
      return res
        .status(404)
        .send({ status: false, msg: "Blog is already deleted" });
    }
    const deleteData = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { $set: { isDeleted: true, deletedAt: Date.now() } },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      msg: "Blog deleted successfully",
      data: deleteData,
    });
  } catch (err) {
    console.log(err);
    return res.status(505).send({ status: "false", message: err });
  }
};


// ============>Delete Blogs By Query Params <==============
const deleteByQuery = async (req, res) => {
  try {
    let data = req.query;
    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        msg: "Provide atleast one Query to delete blog",
      });
    }

    let { category, authorId, tags, subcategory, isPublished } = data;
    let filter = { isDeleted: false };

    if (category || category == "") {
      if (!isEmpty(category)) {
        return res
          .status(400)
          .send({ status: false, msg: "category must be present" });
      }
      filter.category = category;
    }
    if (authorId || authorId == "") {
      if (!isEmpty(authorId)) {
        return res
          .status(400)
          .send({ status: false, msg: "authorId must be present" });
      }
      if (!!isValidObjectId(authorId)) {
        return res.status(400).send({ status: false, msg: "Invalid blogId" });
      }
      filter.authorId = authorId;
    }
    if (tags) {
      if (tags.trim().length == 0) {
        return res.status(400).send({ status: false, msg: "Enter valid tags" });
      }
      tags = tags.split(",");
      filter.tags = { $in: tags };
    }
    if (subcategory) {
      if (subcategory.trim().length == 0) {
        return res
          .status(400)
          .send({ status: false, msg: "Enter valid subcategory" });
      }
      subcategory = subcategory.split(",");
      filter.subcategory = { $in: subcategory };
    }
    if (data.hasOwnProperty("isPublished")) {
      if (!["true", "false"].includes(isPublished)) {
        return res.status(400).send({
          status: false,
          msg: "is published can only be a boolean value",
        });
      }
      filter.isPublished = isPublished;
    }

    const deleteBlogs = await blogModel.updateMany(filter, {
      $set: { isDeleted: true, deletedAt: Date.now() },
    });
    // console.log(data)
    if (deleteBlogs.modifiedCount == 0) {
      return res
        .status(404)
        .send({ status: false, msg: "Such Blog Data not found" });
    }
    return res
      .status(200)
      .send({ status: true, msg: "Blog Deleted Successfully", data: deleteBlogs});
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

export { createBlog, getBlog, updateBlog, deleteBlog, deleteByQuery, getBlogById};

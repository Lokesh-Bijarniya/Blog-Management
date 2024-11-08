import {Router} from 'express';
import { createBlog, deleteBlog, getBlog, updateBlog, deleteByQuery, getBlogById } from '../controllers/blogController.js';
import { authenticate, authorize, authorizeByQuery } from '../middleware/middleware.js';


const router = Router();

// Add your routes here
router.post('/createBlog', authenticate, createBlog);

router.put("/updateBlog/:blogId", authenticate, authorize, updateBlog);

router.get('/getBlog', getBlog);

router.get('/getBlog/:authorId', getBlogById);


// ======> Delete Blogs Api <==========
router.delete("/deleteBlog/:blogId", authenticate, authorize, deleteBlog);

// ======> Delete Blogs By Query Params <=======
router.delete("/deleteBlog", authenticate, authorizeByQuery, deleteByQuery);

//-API for wrong route-of-API--->>>
router.all("/*", function (req, res) {
    return res.status(400).send({ status: false, message: "Path Not Found" });
  });

  
export default router;
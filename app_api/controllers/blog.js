const mongoose = require("mongoose");
const User = mongoose.model('users');
const Blog = mongoose.model("blogs");

// GET: /blogs - lists all blogs
const blogsList = async (req, res) => {
  Blog
    .find({})  // no parameter in find query returns all blogs
    .exec((err, blogs) => {
      // if no blogs found, return error message
      if (!blogs) {
        return res
          .status(404)
          .json({ "message": "Blog not found" });
        // else if error occurred in mongoose, return the error
      } else if (err) {
        return res
          .status(404)
          .json(err);
        // else the blogs were found, so return OK code and blogs
      } else {
        return res
          .status(200)
          .json(blogs);
      }
    })
};

// GET: /blogs/:blogCode - returns a single blog
const blogsFindCode = async (req, res) => {
  Blog
    .findOne({ 'articlecode': req.params.blogCode })
    .exec((err, blog) => {
      if (!blog) {
        return res
          .status(404)
          .json({ "message": "Blog not found" });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      } else {
        return res
          .status(200)
          .json(blog)
      }
    });
};


const blogsUpdateBlog = async (req, res) => {
  console.log(req.body);
  getUser(req, res, (req, res) => {
    Blog.findOneAndUpdate(
      { articlecode: req.params.blogCode },
      {
        articlecode: req.body.articlecode,
        category: req.body.category,
        authorimage: req.body.authorimage,
        authorfirstname: req.body.authorfirstname,
        authorlastname: req.body.authorlastname,
        authorbio: req.body.authorbio,
        blogtitle: req.body.blogtitle,
        blogdate: req.body.blogdate,
        blogimage: req.body.blogimage,
        blogshortdesc: req.body.blogshortdesc,
        bloglongdesc: req.body.bloglongdesc,
      },
      { new: true }
    )
      .then((blog) => {
        if (!blog) {
          return res.status(404).send({
            message: "Blog not found with code " + req.params.blogCode,
          });
        }
        res.send(blog);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Blog not found with code " + req.params.blogCode,
          });
        }
        return res
          .status(500) // server error
          .json(err);
      });
  });
};

const blogsDeleteBlog = async (req, res) => {

  getUser(req, res, (req, res) => {
    Blog.findOneAndDelete(
      { 'articlecode': req.params.blogCode })
      .then((blogCode) => {
        if (!blogCode) {
          return res.status(404).send({
            message: "Blog not found with code " + req.params.blogCode,
          });
        }
        res.send(blogCode);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Blog not found with code " + req.params.blogCode,
          });
        }
        return res
          .status(500) // server error
          .json(err);
      });
   
  })};

const blogsAddBlog = async (req, res) => {
  getUser(req, res, (req, res) => {
    Blog.create(
      {
        articlecode: req.body.articlecode,
        category: req.body.category,
        authorimage: req.body.authorimage,
        authorfirstname: req.body.authorfirstname,
        authorlastname: req.body.authorlastname,
        authorbio: req.body.authorbio,
        blogtitle: req.body.blogtitle,
        blogdate: req.body.blogdate,
        blogimage: req.body.blogimage,
        blogshortdesc: req.body.blogshortdesc,
        bloglongdesc: req.body.bloglongdesc,

      },
      (err, blog) => {
        if (err) {
          return res
            .status(400) //bad request
            .json(err);
        } else {
          return res
            .status(201) //creates
            .json(blog);
        }
      }
    );
  });
};
const getUser = (req, res, callback) => {
  if (req.payload && req.payload.email) {
    User.findOne({ email: req.payload.email }).exec((err, user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } else if (err) {
        console.log(err);
        return res.status(404).json(err);
      }
      callback(req, res, user.name);
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  blogsList,
  blogsFindCode,
  blogsAddBlog,
  blogsUpdateBlog,
  blogsDeleteBlog
};
const express = require("express");
const router = express.Router();

const jwt = require("express-jwt");
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["HS256"],
});

const authController = require("../controllers/authentication");
const trainersController = require("../controllers/trainers");
const blogsController = require("../controllers/blog");

router.route("/login").post(authController.login);

router.route("/register").post(authController.register);


// TRAINER END POINTS

router
    .route("/trainers")
    .get(trainersController.trainersList)
    .post(auth, trainersController.trainersAddTrainer);

router
    .route("/trainers/:trainerCode")
    .get(trainersController.trainersFindCode)
    .put(auth, trainersController.trainersUpdateTrainer);

    router
    .route("/trainers/delete/:trainerCode")
    .delete(auth, trainersController.trainersDeleteTrainer);
    


// BLOG ENDPOINTS
 router
    .route("/blogs")
    .get(blogsController.blogsList)
    .post(auth, blogsController.blogsAddBlog);

router
    .route("/blogs/:blogCode")
    .get(blogsController.blogsFindCode)
    .put(auth, blogsController.blogsUpdateBlog);  

router
    .route("/blogs/delete/:blogCode")
    .delete(auth, blogsController.blogsDeleteBlog);

router
    .route("/blog-detail/:blogCode")
    .get(blogsController.blogsFindCode);  

module.exports = router;
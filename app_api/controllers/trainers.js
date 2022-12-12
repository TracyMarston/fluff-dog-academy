const mongoose = require("mongoose");
const User = mongoose.model('users');
const Trainer = mongoose.model("trainers");

// GET: /trainers - lists all trainers
const trainersList = async (req, res) => {
  Trainer
      .find({})  // no parameter in find query returns all trainers
      .exec((err, trainers) => {
          // if no trainers found, return error message
          if (!trainers) {
              return res
                  .status(404)
                  .json({ "message": "Trainer not found" });
          // else if error occurred in mongoose, return the error
          } else if (err) {
              return res
                  .status(404)
                  .json(err);
          // else the trainers were found, so return OK code and trainers
          } else {
              return res
                  .status(200)
                  .json(trainers);
          }
      })
};

// GET: /trainers/:trainerCode - returns a single trainer
const trainersFindCode = async (req, res) => {
  Trainer
      .findOne({ 'code': req.params.trainerCode })
      .exec((err, trainer) => {
          if (!trainer) {
              return res
                  .status(404)
                  .json({ "message": "Trainer not found" });
          } else if (err) {
              return res
                  .status(404)
                  .json(err);
          } else {
              return res
                  .status(200)
                  .json(trainer)
          }
      });
};
const trainersDeleteTrainer = async (req, res) => {

  getUser(req, res, (req, res) => {
    Trainer.findOneAndDelete(
      { 'code': req.params.trainerCode })
      .then((trainerCode) => {
        if (!trainerCode) {
          return res.status(404).send({
            message: "Trainer not found with code " + req.params.trainerCode,
          });
        }
        res.send(trainerCode);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Trainer not found with code " + req.params.trainerCode,
          });
        }
        return res
          .status(500) // server error
          .json(err);
      });
   
  })};

const trainersUpdateTrainer = async (req, res) => {
  console.log(req.body);
  getUser(req, res, (req, res) => {
    Trainer.findOneAndUpdate(
      { code: req.params.trainerCode },
      {
        code: req.body.code,
        image: req.body.image, 
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        title: req.body.title,
        email: req.body.email,
        certification: req.body.certification,
        bio: req.body.bio,
        },
        { new: true }
        )
          .then((trainer) => {
            if (!trainer) {
              return res.status(404).send({
                message: "Trainer not found with code " + req.params.trainerCode,
              });
            }
            res.send(trainer);
          })
          .catch((err) => {
            if (err.kind === "ObjectId") {
              return res.status(404).send({
                message: "Trainer not found with code " + req.params.trainerCode,
              });
            }
            return res
              .status(500) // server error
              .json(err);
          });
      });
    };
  

    const trainersAddTrainer = async (req, res) => {
      getUser(req, res, (req, res) => {
        Trainer.create(
      {
        code: req.body.code,
        image: req.body.image, 
        firstname: req.body.firstname,
        lastname:req.body.lastname,
        title: req.body.title,
        email: req.body.email,
        certification: req.body.certification,
        bio: req.body.bio,
      },
      (err, trainer) => {
        if (err) {
          return res
            .status(400) //bad request
            .json(err);
        } else {
          return res
            .status(201) //creates
            .json(trainer);
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
  trainersList,
  trainersFindCode,
  trainersAddTrainer,
  trainersUpdateTrainer,
  trainersDeleteTrainer
};
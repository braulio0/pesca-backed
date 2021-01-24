const db = require("./../models");
const Login = db.Login;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  let password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const login = {
    email: req.body.email,
    password: password,
    role: "USER",
  };
  await Login.create(login)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Hubo un error al registrarte",
      });
    });
  //Create Login
};

exports.findOne = async (req, res) => {
  const email = req.params.email;
  const user = await Login.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(
      req.params.password,
      user.password
    );
    if (validPassword) {
     res.send(user);
      // res.status(200).json({ message: "Valid password" });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
};
exports.update = async (req, res) => {
  const email = req.params.email;

  Login.update(req.body, {
    where: { email: email },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Solicitante was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Solicitante with email=${email}. Maybe Solicitante was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating solicitante with email=" + email,
      });
    });
};


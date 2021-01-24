const bcrypt = require('bcrypt');
const db = require("./../models");
const Solicitante = db.Solicitate;
const Login = db.Login;

exports.create = async (req, res, next) => {
  ;
  try {
let password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt)
    const solicitante = {
      Username: req.body.Username,
      address: req.body.address,
      phone: req.body.phone,
      RFC: req.body.RFC,
      CURP: req.body.CURP,
      zipCode: req.body.zipCode,
      country: req.body.country,
      email: req.body.email,
      licenseFishing: req.body.licenseFishing,
      Originstate: req.body.Originstate,
      fishing: req.body.fishing,
      status: "PENDING",
      clubName: req.body.clubName,
    };
    const login = {
      email: req.body.email,
      password: password,
      role: "USER",
    };

    //Create Login
    const Log = await Login.create(login)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Hubo un error al registrarte",
        });
      });

    //Create User
    await Solicitante.create(solicitante)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || " Some erros ocurred while creating Solicitante",
        });
      });
  } catch (error) {
    console.log(error);
  }
};
exports.findAll = async (req, res) => {
  const email = req.query.email;
  var condition = email ? { name: { [Op.iLike]: `%${email}%` } } : null;

  Solicitante.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving Solicitante.",
      });
    });
};

exports.findOne = async (req, res) => {
  const email = req.params.email;

  Solicitante.findOne({ where: { email: email } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Solicitante with id=" + name,
      });
    });
};

exports.update = async (req, res) => {
  const email = req.params.email;

  Solicitante.update(req.body, {
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

exports.delete = async (req, res) => {
  const email = req.body.email;
  Solicitante.destroy({
    where: { email: email },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Solicitante was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Solicitante with email=${email}. Maybe Solicitante was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Solicitante  with email=" + email,
      });
    });
};

exports.deleteAll = async (req, res) => {
  Solicitante.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Solicitantes were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Solicitantes.",
      });
    });
};

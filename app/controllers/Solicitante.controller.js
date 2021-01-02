const db = require('./../models');
const Solicitante = db.Solicitate;

exports.create = async ( req, res ) => {
	const solicitante = {
	  name: req.body.name,
    address:req.body.address,
    phone: req.body.phone,
    RFC: req.body.RFC.toUpperCase(),
    CURP: req.body.CURP.toUpperCase(),
    zipCode: req.body.zipCode,
    country:req.body.country,
    email: req.body.email,
    licenseFishing: req.body.licenseFishing,
    Originstate:req.body.Originstate,
    fishing: req.body.fishing,

	};
	Solicitante.create(solicitante)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: 
				err.message || " Some erros ocurred while creating Solicitante"
			}
			);
		});
};
exports.findAll = async (req, res) => {
  const email = req.query.email;
  var condition = email ? { name: { [Op.iLike]: `%${email}%` } } : null;

  Solicitante.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Solicitante."
      });
    });
};

exports.findOne = async (req, res) => {
  const email = req.params.email;

  Solicitante.findOne({where: {email: email}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Solicitante with id=" + name
      });
    });
};

exports.update = async(req, res) => {
  const email = req.params.email;

  Solicitante.update(req.body, {

    where: { email: email }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Solicitante was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Solicitante with email=${email}. Maybe Solicitante was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating solicitante with email=" + email
      });
    });
};

exports.delete = async(req, res) => {
  const email = req.body.email;
  Solicitante.destroy({

    where: { email: email }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Solicitante was deleted successfully!"
        });
      } else {
        res.send({

          message: `Cannot delete Solicitante with email=${email}. Maybe Solicitante was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Solicitante  with email=" + email
      });
    });
};

exports.deleteAll = async(req, res) => {
  Solicitante.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Solicitantes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Solicitantes."
      });
    });
};

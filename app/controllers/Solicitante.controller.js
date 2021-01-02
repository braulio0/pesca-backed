const db = require('./../models');
const Solicitate = db.Solicitate;

exports.create = async ( req, res ) => {
	const solicitate = {
	  name: req.body.name,
    address:req.body.address,
    phone: req.body.phone,
    RFC: req.body.RFC.toUpperCase(),
    CURP: req.body.CURP.toUpperCase(),
    zipCode: req.body.zipCode,
	};
	Solicitate.create(solicitate)
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
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Solicitate.findAll({ where: condition })
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
  const name = req.params.name;

  Solicitate.findByPk(name)
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
  const name = req.params.name;

  Solicitate.update(req.body, {
    where: { name: name }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Solicitante was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Solicitante with Name=${name}. Maybe Solicitante was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Club with name=" + name
      });
    });
};

exports.delete = async(req, res) => {
  const name = req.body.name;
  Solicitate.destroy({

    where: { name: name }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Solicitante was deleted successfully!"
        });
      } else {
        res.send({

          message: `Cannot delete Solicitante with name=${name}. Maybe Solicitante was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Solicitante  with name=" + name
      });
    });
};

exports.deleteAll = async(req, res) => {
  Solicitate.destroy({
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

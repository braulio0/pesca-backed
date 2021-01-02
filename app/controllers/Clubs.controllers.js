const db = require('./../models');
const Clubs = db.Club;

exports.create = async ( req, res ) => {
	const clubs = {
	  name: req.body.name,
    address:req.body.address,
    phone: req.body.phone,
    zipCode: req.body.zipCode,
		state: req.body.state,
		districts:req.body.districts,
		businessHours: req.body.businessHours,
	};
	Clubs.create(clubs)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: 
				err.message || " Some erros ocurred while creating club"
			}
			);
		});
};
exports.findAll = async (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Clubs.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving CLubs."
      });
    });
};

exports.findOne = async (req, res) => {
  const name = req.params.name;

  Clubs.findByPk(name)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + name
      });
    });
};

exports.update = async(req, res) => {
  const name = req.params.name;

  Clubs.update(req.body, {
    where: { name: name }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Club was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Club with Name=${name}. Maybe Club was not found or req.body is empty!`
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
  Clubs.destroy({

    where: { name: name }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Club was deleted successfully!"
        });
      } else {
        res.send({

          message: `Cannot delete Club with name=${name}. Maybe Club was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Club with name=" + name
      });
    });
};

exports.deleteAll = async(req, res) => {
  Empleado.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

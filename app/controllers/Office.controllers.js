const db = require('./../models');
const Office = db.Office;

exports.create = async ( req, res ) => {
	const office = {
	  name: req.body.name,
    address:req.body.address,
    phone: req.body.phone,
    zipCode: req.body.zipCode,
		state: req.body.state,
		districts:req.body.districts,
		businessHours: req.body.businessHours,
	};
	Office.create(office)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: 
				err.message || " Some erros ocurred while creating office"
			}
			);
		});
};
exports.findAll = async (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Office.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving office."
      });
    });
};

exports.findOne = async (req, res) => {
  const name = req.params.name;

  Office.findByPk(name)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Office with id=" + name
      });
    });
};

exports.update = async(req, res) => {
  const name = req.params.name;

  Office.update(req.body, {
    where: { name: name }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Office was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Office with Name=${name}. Maybe Office was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Office with name=" + name
      });
    });
};

exports.delete = async(req, res) => {
  const name = req.body.name;
  Office.destroy({

    where: { name: name }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Office was deleted successfully!"
        });
      } else {
        res.send({

          message: `Cannot delete Office with name=${name}. Maybe Office was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Office with name=" + name
      });
    });
};

exports.deleteAll = async(req, res) => {
 Office.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Offices were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all offices."
      });
    });
};

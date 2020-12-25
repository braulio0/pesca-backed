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
				err.message || " Some erros ocurred while creating solicitate"
			}
			);
		});
};

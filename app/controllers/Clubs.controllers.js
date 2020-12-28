const db = require('./../models');
const Clubs = db.Clubs;

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

module.exports = ( sequelize, Sequelize ) => {
  const Solicitante = sequelize.define("solicitante", {
    name:{
      type : Sequelize.STRING,
    },
    address:{
      type: Sequelize.STRING,
    },
    phone:{
      type: Sequelize.DOUBLE,
    },
    RFC:{
      type: Sequelize.STRING
    },
    CURP:{
      type: Sequelize.STRING,
      primaryKey:true,
    },
    zipCode:{
      type: Sequelize.INTEGER,
    },
    country:{
      type: Sequelize.STRING,
    },
    email:{
      type: Sequelize.STRING,
    },
    licenseFishing:{
      type: Sequelize.STRING,
    },
    Originstate:{
      type: Sequelize.STRING,
    },
    fishing:{
      type: Sequelize.STRING,
    },
    payCode:{
      type: Sequelize.STRING,
    },
    dependency:{
      type: Sequelize.INTEGER,
    },
    amount:{
      type: Sequelize.INTEGER,
    },
  });
  return Solicitante;
};

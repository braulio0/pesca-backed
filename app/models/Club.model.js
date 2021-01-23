module.exports = (sequelize, Sequelize) => {
  const Club = sequelize.define("club", {
    name: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    address: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    zipCode: {
      type: Sequelize.STRING,
    },
    state: {
      type: Sequelize.STRING,
    },
    districts: {
      type: Sequelize.STRING,
    },
    businessHours: {
      type: Sequelize.STRING,
    },
  });
  return Club;
};

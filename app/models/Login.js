module.exports = (sequelize, Sequelize) => {
  const Login = sequelize.define("login", {
    email: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
  });
  return Login;
};

const { DataTypes, Sequelize } = require("sequelize");
const db = require("../config/config");

const Session = db.define(
  "Session",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Session.associate = (models) => {
  Session.hasMany(models.Lesson, {
    foreignKey: {
      name: "sessionId",
      allowNull: false,
    },
    as: "lessons",
  });
};

module.exports = Session;

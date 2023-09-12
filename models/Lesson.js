const { DataTypes, Sequelize } = require("sequelize");
const db = require("../config/config");
const Session = require("./Session");

const Lesson = db.define(
  "Lesson",
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.UUID, // Use the appropriate data type for your sessionId
      allowNull: false,
      references: {
        model: Session, // Referencing the Session model
        key: "id", // The key in the Session model that will be used as a foreign key
      },
    },
  },
  {
    timestamps: true,
  }
);

Lesson.associate = (models) => {
  Lesson.belongsTo(models.Session, {
    foreignKey: {
      name: "sessionId",
      allowNull: false,
    },
    as: "session",
  }); // This sets up the association to Session
};

module.exports = Lesson;

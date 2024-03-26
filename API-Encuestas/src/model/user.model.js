import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";

class User extends Model {}

User.init(
  {
    googleId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    code : {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
    paranoid: true,
    timestamps: true,
    underscored: true,
  }
);

export default User;
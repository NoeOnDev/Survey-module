import bcrypt from "bcrypt";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db.config.js";

export class User extends Model {}

User.init(
  {
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    registrationMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
    paranoid: true,
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, 10);
        }

        if (user.googleId) {
          user.registrationMethod = "google";
        } else {
          user.registrationMethod = "local";
        }
      },
    },
  }
);

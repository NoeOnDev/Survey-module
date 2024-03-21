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
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const rounds = 10;
          const salt = await bcrypt.genSalt(rounds);
          const hash = await bcrypt.hash(user.password, salt);
          user.password = hash;
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

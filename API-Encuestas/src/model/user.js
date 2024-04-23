import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

class User extends Model {}

User.init({
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  underscored: true,
  timestamps: true,
  paranoid: true,
});

export default User;
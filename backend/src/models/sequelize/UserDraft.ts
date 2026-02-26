import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/db.postgres";

export class UserDraft extends Model {
  public id!: number;
  public userId!: number;
  public stepData!: any; // JSON column to store partial form data
  public lastStep!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserDraft.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    stepData: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    lastStep: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "UserDraft",
    tableName: "user_drafts",
  },
);

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface MotherTongueAttributes {
  id: number;
  name: string;
  code: string | null;
  isActive: boolean;
}

interface MotherTongueCreationAttributes extends Optional<
  MotherTongueAttributes,
  "id" | "code" | "isActive"
> {}

export class MotherTongue
  extends Model<MotherTongueAttributes, MotherTongueCreationAttributes>
  implements MotherTongueAttributes
{
  public id!: number;
  public name!: string;
  public code!: string | null;
  public isActive!: boolean;
}

MotherTongue.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "mother_tongues",
    timestamps: false,
  },
);

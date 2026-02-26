import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface EmploymentTypeAttributes {
  id: number;
  name: string;
}

interface EmploymentTypeCreationAttributes extends Optional<
  EmploymentTypeAttributes,
  "id"
> {}

export class EmploymentType
  extends Model<EmploymentTypeAttributes, EmploymentTypeCreationAttributes>
  implements EmploymentTypeAttributes
{
  public id!: number;
  public name!: string;
}

EmploymentType.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "employment_types",
    timestamps: false,
  },
);

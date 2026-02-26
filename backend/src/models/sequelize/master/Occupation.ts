import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";
import { EmploymentType } from "./EmploymentType";

interface OccupationAttributes {
  id: number;
  employmentTypeId: number;
  name: string;
  isActive: boolean;
}

interface OccupationCreationAttributes extends Optional<
  OccupationAttributes,
  "id" | "isActive"
> {}

export class Occupation
  extends Model<OccupationAttributes, OccupationCreationAttributes>
  implements OccupationAttributes
{
  public id!: number;
  public employmentTypeId!: number;
  public name!: string;
  public isActive!: boolean;
}

Occupation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employmentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: EmploymentType,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "occupations",
    timestamps: false,
  },
);

EmploymentType.hasMany(Occupation, { foreignKey: "employmentTypeId" });
Occupation.belongsTo(EmploymentType, { foreignKey: "employmentTypeId" });

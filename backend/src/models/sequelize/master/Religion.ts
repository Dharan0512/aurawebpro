import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface ReligionAttributes {
  id: number;
  name: string;
  isActive: boolean;
}

interface ReligionCreationAttributes extends Optional<
  ReligionAttributes,
  "id" | "isActive"
> {}

export class Religion
  extends Model<ReligionAttributes, ReligionCreationAttributes>
  implements ReligionAttributes
{
  public id!: number;
  public name!: string;
  public isActive!: boolean;
}

Religion.init(
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "religions",
    timestamps: false,
  },
);

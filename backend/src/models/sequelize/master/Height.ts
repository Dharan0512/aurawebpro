import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface HeightAttributes {
  id: number;
  cmValue: number;
  displayLabel: string;
}

interface HeightCreationAttributes extends Optional<HeightAttributes, "id"> {}

export class Height
  extends Model<HeightAttributes, HeightCreationAttributes>
  implements HeightAttributes
{
  public id!: number;
  public cmValue!: number;
  public displayLabel!: string;
}

Height.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cmValue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    displayLabel: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "heights",
    timestamps: false,
  },
);

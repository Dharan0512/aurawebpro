import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";
import { State } from "./State";

interface CityAttributes {
  id: number;
  stateId: number;
  name: string;
  isActive: boolean;
}

interface CityCreationAttributes extends Optional<
  CityAttributes,
  "id" | "isActive"
> {}

export class City
  extends Model<CityAttributes, CityCreationAttributes>
  implements CityAttributes
{
  public id!: number;
  public stateId!: number;
  public name!: string;
  public isActive!: boolean;
}

City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: State,
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
    tableName: "cities",
    timestamps: false,
  },
);

State.hasMany(City, { foreignKey: "stateId" });
City.belongsTo(State, { foreignKey: "stateId" });

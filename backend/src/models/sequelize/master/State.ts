import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";
import { Country } from "./Country";

interface StateAttributes {
  id: number;
  countryId: number;
  name: string;
  isActive: boolean;
}

interface StateCreationAttributes extends Optional<
  StateAttributes,
  "id" | "isActive"
> {}

export class State
  extends Model<StateAttributes, StateCreationAttributes>
  implements StateAttributes
{
  public id!: number;
  public countryId!: number;
  public name!: string;
  public isActive!: boolean;
}

State.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Country,
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
    tableName: "states",
    timestamps: false,
  },
);

Country.hasMany(State, { foreignKey: "countryId" });
State.belongsTo(Country, { foreignKey: "countryId" });

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface CurrencyAttributes {
  id: number;
  name: string;
  symbol: string;
  code: string;
}

interface CurrencyCreationAttributes extends Optional<
  CurrencyAttributes,
  "id"
> {}

export class Currency
  extends Model<CurrencyAttributes, CurrencyCreationAttributes>
  implements CurrencyAttributes
{
  public id!: number;
  public name!: string;
  public symbol!: string;
  public code!: string;
}

Currency.init(
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
    symbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "currencies",
    timestamps: false,
  },
);

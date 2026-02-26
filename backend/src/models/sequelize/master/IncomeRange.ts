import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";
import { Currency } from "./Currency";

interface IncomeRangeAttributes {
  id: number;
  currencyId: number;
  minValue: number; // Storing as BigInt conceptually but integer works if JS safe integer fits
  maxValue: number;
  displayLabel: string;
  sortOrder: number;
}

interface IncomeRangeCreationAttributes extends Optional<
  IncomeRangeAttributes,
  "id" | "sortOrder"
> {}

export class IncomeRange
  extends Model<IncomeRangeAttributes, IncomeRangeCreationAttributes>
  implements IncomeRangeAttributes
{
  public id!: number;
  public currencyId!: number;
  public minValue!: number;
  public maxValue!: number;
  public displayLabel!: string;
  public sortOrder!: number;
}

IncomeRange.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    currencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Currency,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    minValue: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    maxValue: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    displayLabel: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "income_ranges",
    timestamps: false,
  },
);

Currency.hasMany(IncomeRange, { foreignKey: "currencyId" });
IncomeRange.belongsTo(Currency, { foreignKey: "currencyId" });

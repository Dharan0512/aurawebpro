import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";

interface CountryAttributes {
  id: number;
  name: string;
  isoCode: string;
  phoneCode: string;
  isActive: boolean;
}

interface CountryCreationAttributes extends Optional<
  CountryAttributes,
  "id" | "isActive"
> {}

export class Country
  extends Model<CountryAttributes, CountryCreationAttributes>
  implements CountryAttributes
{
  public id!: number;
  public name!: string;
  public isoCode!: string;
  public phoneCode!: string;
  public isActive!: boolean;
}

Country.init(
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
    isoCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    phoneCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "countries",
    timestamps: false,
  },
);

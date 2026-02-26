import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/db.postgres";
import { Religion } from "./Religion";

interface CasteAttributes {
  id: number;
  religionId: number;
  name: string;
  isActive: boolean;
}

interface CasteCreationAttributes extends Optional<
  CasteAttributes,
  "id" | "isActive"
> {}

export class Caste
  extends Model<CasteAttributes, CasteCreationAttributes>
  implements CasteAttributes
{
  public id!: number;
  public religionId!: number;
  public name!: string;
  public isActive!: boolean;
}

Caste.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    religionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Religion,
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
    tableName: "castes",
    timestamps: false,
  },
);

Religion.hasMany(Caste, { foreignKey: "religionId" });
Caste.belongsTo(Religion, { foreignKey: "religionId" });

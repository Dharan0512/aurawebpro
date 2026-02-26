import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";
import { Religion } from "./master/Religion";
import { Caste } from "./master/Caste";
import { Country } from "./master/Country";
import { State } from "./master/State";
import { Education } from "./master/Education";

interface PartnerPreferenceAttributes {
  id: number;
  userId: number;
  minAge: number;
  maxAge: number;
  minHeightCm: number | null;
  maxHeightCm: number | null;
  maritalStatus: string | null; // e.g. "Never Married,Divorced"
  religionId: number | null;
  casteId: number | null;
  educationId: number | null;
  countryId: number | null;
  stateId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PartnerPreferenceCreationAttributes extends Optional<
  PartnerPreferenceAttributes,
  | "id"
  | "minAge"
  | "maxAge"
  | "minHeightCm"
  | "maxHeightCm"
  | "maritalStatus"
  | "religionId"
  | "casteId"
  | "educationId"
  | "countryId"
  | "stateId"
> {}

export class PartnerPreference
  extends Model<
    PartnerPreferenceAttributes,
    PartnerPreferenceCreationAttributes
  >
  implements PartnerPreferenceAttributes
{
  public id!: number;
  public userId!: number;
  public minAge!: number;
  public maxAge!: number;
  public minHeightCm!: number | null;
  public maxHeightCm!: number | null;
  public maritalStatus!: string | null;
  public religionId!: number | null;
  public casteId!: number | null;
  public educationId!: number | null;
  public countryId!: number | null;
  public stateId!: number | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PartnerPreference.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    minAge: { type: DataTypes.INTEGER, defaultValue: 18 },
    maxAge: { type: DataTypes.INTEGER, defaultValue: 40 },
    minHeightCm: { type: DataTypes.INTEGER, allowNull: true },
    maxHeightCm: { type: DataTypes.INTEGER, allowNull: true },
    maritalStatus: { type: DataTypes.STRING(255), allowNull: true }, // Store as "Never Married,Divorced"

    // Foreign Keys to Master Tables
    religionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Religion, key: "id" },
      onDelete: "SET NULL",
    },
    casteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Caste, key: "id" },
      onDelete: "SET NULL",
    },
    educationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Education, key: "id" },
      onDelete: "SET NULL",
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Country, key: "id" },
      onDelete: "SET NULL",
    },
    stateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: State, key: "id" },
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "partner_preferences",
    timestamps: true,
  },
);

User.hasOne(PartnerPreference, { foreignKey: "userId" });
PartnerPreference.belongsTo(User, { foreignKey: "userId" });

PartnerPreference.belongsTo(Religion, { foreignKey: "religionId" });
Religion.hasMany(PartnerPreference, { foreignKey: "religionId" });

PartnerPreference.belongsTo(Caste, { foreignKey: "casteId" });
Caste.hasMany(PartnerPreference, { foreignKey: "casteId" });

PartnerPreference.belongsTo(Education, { foreignKey: "educationId" });
Education.hasMany(PartnerPreference, { foreignKey: "educationId" });

PartnerPreference.belongsTo(Country, { foreignKey: "countryId" });
Country.hasMany(PartnerPreference, { foreignKey: "countryId" });

PartnerPreference.belongsTo(State, { foreignKey: "stateId" });
State.hasMany(PartnerPreference, { foreignKey: "stateId" });

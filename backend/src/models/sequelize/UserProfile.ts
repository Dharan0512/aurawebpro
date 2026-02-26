import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";
import { MotherTongue } from "./master/MotherTongue";
import { Religion } from "./master/Religion";
import { Caste } from "./master/Caste";
import { Country } from "./master/Country";
import { State } from "./master/State";
import { City } from "./master/City";
import { Education } from "./master/Education";
import { EmploymentType } from "./master/EmploymentType";
import { Occupation } from "./master/Occupation";
import { Currency } from "./master/Currency";
import { IncomeRange } from "./master/IncomeRange";

interface UserProfileAttributes {
  id: number;
  userId: number;
  dob: Date | null;
  heightCm: number | null;
  physicalStatus: "Normal" | "Physically Challenged";
  maritalStatus: "Never Married" | "Divorced" | "Widowed" | "Awaiting Divorce";
  childrenCount: number;
  childrenLivingWith: boolean;
  motherTongueId: number | null;
  religionId: number | null;
  casteId: number | null;
  subcaste: string | null;
  countryId: number | null;
  stateId: number | null;
  cityId: number | null;
  educationId: number | null;
  employmentTypeId: number | null;
  occupationId: number | null;
  incomeCurrencyId: number | null;
  incomeRangeId: number | null;
  familyStatus:
    | "Middle Class"
    | "Upper Middle Class"
    | "Rich"
    | "Affluent"
    | null;
  familyWealth: string | null;
  aboutMe: string | null;
  // Lifestyle & Personality
  diet: "Veg" | "Non-veg" | "Eggetarian" | "Vegan" | null;
  drink: "Yes" | "No" | "Occasionally" | null;
  smoke: "Yes" | "No" | "Occasionally" | null;
  fitness: "Regular" | "Occasional" | "Not at all" | null;
  spirituality:
    | "Very Spiritual"
    | "Moderately Spiritual"
    | "Not Spiritual"
    | null;
  ambition: "High" | "Moderate" | "Low" | null;
  childrenPreference: "Yes" | "No" | "Flexible" | null;
  careerAfterMarriage: "Yes" | "No" | "Flexible" | null;
  relocation: "Yes" | "No" | "Flexible" | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserProfileCreationAttributes extends Optional<
  UserProfileAttributes,
  | "id"
  | "dob"
  | "heightCm"
  | "physicalStatus"
  | "maritalStatus"
  | "childrenCount"
  | "childrenLivingWith"
  | "motherTongueId"
  | "religionId"
  | "casteId"
  | "subcaste"
  | "countryId"
  | "stateId"
  | "cityId"
  | "educationId"
  | "employmentTypeId"
  | "occupationId"
  | "incomeCurrencyId"
  | "incomeRangeId"
  | "familyStatus"
  | "familyWealth"
  | "aboutMe"
> {}

export class UserProfile
  extends Model<UserProfileAttributes, UserProfileCreationAttributes>
  implements UserProfileAttributes
{
  public id!: number;
  public userId!: number;
  public dob!: Date | null;
  public heightCm!: number | null;
  public physicalStatus!: "Normal" | "Physically Challenged";
  public maritalStatus!:
    | "Never Married"
    | "Divorced"
    | "Widowed"
    | "Awaiting Divorce";
  public childrenCount!: number;
  public childrenLivingWith!: boolean;
  public motherTongueId!: number | null;
  public religionId!: number | null;
  public casteId!: number | null;
  public subcaste!: string | null;
  public countryId!: number | null;
  public stateId!: number | null;
  public cityId!: number | null;
  public educationId!: number | null;
  public employmentTypeId!: number | null;
  public occupationId!: number | null;
  public incomeCurrencyId!: number | null;
  public incomeRangeId!: number | null;
  public familyStatus!:
    | "Middle Class"
    | "Upper Middle Class"
    | "Rich"
    | "Affluent"
    | null;
  public familyWealth!: string | null;
  public aboutMe!: string | null;
  public diet!: "Veg" | "Non-veg" | "Eggetarian" | "Vegan" | null;
  public drink!: "Yes" | "No" | "Occasionally" | null;
  public smoke!: "Yes" | "No" | "Occasionally" | null;
  public fitness!: "Regular" | "Occasional" | "Not at all" | null;
  public spirituality!:
    | "Very Spiritual"
    | "Moderately Spiritual"
    | "Not Spiritual"
    | null;
  public ambition!: "High" | "Moderate" | "Low" | null;
  public childrenPreference!: "Yes" | "No" | "Flexible" | null;
  public careerAfterMarriage!: "Yes" | "No" | "Flexible" | null;
  public relocation!: "Yes" | "No" | "Flexible" | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserProfile.init(
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
    dob: { type: DataTypes.DATEONLY, allowNull: true },
    heightCm: { type: DataTypes.INTEGER, allowNull: true },
    physicalStatus: {
      type: DataTypes.ENUM("Normal", "Physically Challenged"),
      defaultValue: "Normal",
    },
    maritalStatus: {
      type: DataTypes.ENUM(
        "Never Married",
        "Divorced",
        "Widowed",
        "Awaiting Divorce",
      ),
      defaultValue: "Never Married",
    },
    childrenCount: { type: DataTypes.INTEGER, defaultValue: 0 },
    childrenLivingWith: { type: DataTypes.BOOLEAN, defaultValue: false },

    // Foreign Keys to Master Tables
    motherTongueId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: MotherTongue, key: "id" },
      onDelete: "SET NULL",
    },
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
    subcaste: { type: DataTypes.STRING(100), allowNull: true },
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
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: City, key: "id" },
      onDelete: "SET NULL",
    },
    educationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Education, key: "id" },
      onDelete: "SET NULL",
    },
    employmentTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: EmploymentType, key: "id" },
      onDelete: "SET NULL",
    },
    occupationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Occupation, key: "id" },
      onDelete: "SET NULL",
    },
    incomeCurrencyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: Currency, key: "id" },
      onDelete: "SET NULL",
    },
    incomeRangeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: IncomeRange, key: "id" },
      onDelete: "SET NULL",
    },

    familyStatus: {
      type: DataTypes.ENUM(
        "Middle Class",
        "Upper Middle Class",
        "Rich",
        "Affluent",
      ),
      allowNull: true,
    },
    familyWealth: { type: DataTypes.STRING(255), allowNull: true },
    aboutMe: { type: DataTypes.TEXT, allowNull: true },
    diet: {
      type: DataTypes.ENUM("Veg", "Non-veg", "Eggetarian", "Vegan"),
      allowNull: true,
    },
    drink: {
      type: DataTypes.ENUM("Yes", "No", "Occasionally"),
      allowNull: true,
    },
    smoke: {
      type: DataTypes.ENUM("Yes", "No", "Occasionally"),
      allowNull: true,
    },
    fitness: {
      type: DataTypes.ENUM("Regular", "Occasional", "Not at all"),
      allowNull: true,
    },
    spirituality: {
      type: DataTypes.ENUM(
        "Very Spiritual",
        "Moderately Spiritual",
        "Not Spiritual",
      ),
      allowNull: true,
    },
    ambition: {
      type: DataTypes.ENUM("High", "Moderate", "Low"),
      allowNull: true,
    },
    childrenPreference: {
      type: DataTypes.ENUM("Yes", "No", "Flexible"),
      allowNull: true,
    },
    careerAfterMarriage: {
      type: DataTypes.ENUM("Yes", "No", "Flexible"),
      allowNull: true,
    },
    relocation: {
      type: DataTypes.ENUM("Yes", "No", "Flexible"),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "user_profiles",
    timestamps: true,
  },
);

User.hasOne(UserProfile, { foreignKey: "userId" });
UserProfile.belongsTo(User, { foreignKey: "userId" });

// Define all associations to master tables down the line
UserProfile.belongsTo(MotherTongue, { foreignKey: "motherTongueId" });
MotherTongue.hasMany(UserProfile, { foreignKey: "motherTongueId" });

UserProfile.belongsTo(Religion, { foreignKey: "religionId" });
Religion.hasMany(UserProfile, { foreignKey: "religionId" });

UserProfile.belongsTo(Caste, { foreignKey: "casteId" });
Caste.hasMany(UserProfile, { foreignKey: "casteId" });

UserProfile.belongsTo(Country, { foreignKey: "countryId" });
Country.hasMany(UserProfile, { foreignKey: "countryId" });

UserProfile.belongsTo(State, { foreignKey: "stateId" });
State.hasMany(UserProfile, { foreignKey: "stateId" });

UserProfile.belongsTo(City, { foreignKey: "cityId" });
City.hasMany(UserProfile, { foreignKey: "cityId" });

UserProfile.belongsTo(Education, { foreignKey: "educationId" });
Education.hasMany(UserProfile, { foreignKey: "educationId" });

UserProfile.belongsTo(EmploymentType, { foreignKey: "employmentTypeId" });
EmploymentType.hasMany(UserProfile, { foreignKey: "employmentTypeId" });

UserProfile.belongsTo(Occupation, { foreignKey: "occupationId" });
Occupation.hasMany(UserProfile, { foreignKey: "occupationId" });

UserProfile.belongsTo(Currency, { foreignKey: "incomeCurrencyId" });
Currency.hasMany(UserProfile, { foreignKey: "incomeCurrencyId" });

UserProfile.belongsTo(IncomeRange, { foreignKey: "incomeRangeId" });
IncomeRange.hasMany(UserProfile, { foreignKey: "incomeRangeId" });

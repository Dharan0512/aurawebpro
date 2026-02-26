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
  complexion: string | null;
  shortBio: string | null;
  profileStrength: number;
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
  | "complexion"
  | "shortBio"
  | "profileStrength"
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
  public complexion!: string | null;
  public shortBio!: string | null;
  public profileStrength!: number;

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
    complexion: { type: DataTypes.STRING(50), allowNull: true },
    shortBio: { type: DataTypes.TEXT, allowNull: true },
    profileStrength: { type: DataTypes.INTEGER, defaultValue: 0 },
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

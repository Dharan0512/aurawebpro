import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { UserProfile } from "./UserProfile";

interface HoroscopeDetailsAttributes {
  id: number;
  userProfileId: number;
  star: string | null;
  rasi: string | null;
  laknam: string | null;
  gothram: string | null;
  sevvaiDhosham: "Yes" | "No" | "Don't Know" | null;
  rahuKetuDhosham: "Yes" | "No" | "Don't Know" | null;
  birthTime: string | null;
  birthPlace: string | null;
  horoscopePdfUrl: string | null;
  horoscopeImageUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HoroscopeDetailsCreationAttributes extends Optional<
  HoroscopeDetailsAttributes,
  | "id"
  | "star"
  | "rasi"
  | "laknam"
  | "gothram"
  | "sevvaiDhosham"
  | "rahuKetuDhosham"
  | "birthTime"
  | "birthPlace"
  | "horoscopePdfUrl"
  | "horoscopeImageUrl"
> {}

export class HoroscopeDetails
  extends Model<HoroscopeDetailsAttributes, HoroscopeDetailsCreationAttributes>
  implements HoroscopeDetailsAttributes
{
  public id!: number;
  public userProfileId!: number;
  public star!: string | null;
  public rasi!: string | null;
  public laknam!: string | null;
  public gothram!: string | null;
  public sevvaiDhosham!: "Yes" | "No" | "Don't Know" | null;
  public rahuKetuDhosham!: "Yes" | "No" | "Don't Know" | null;
  public birthTime!: string | null;
  public birthPlace!: string | null;
  public horoscopePdfUrl!: string | null;
  public horoscopeImageUrl!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

HoroscopeDetails.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userProfileId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      unique: true,
      references: { model: UserProfile, key: "id" },
      onDelete: "CASCADE",
    },
    star: { type: DataTypes.STRING(100), allowNull: true },
    rasi: { type: DataTypes.STRING(100), allowNull: true },
    laknam: { type: DataTypes.STRING(100), allowNull: true },
    gothram: { type: DataTypes.STRING(100), allowNull: true },
    sevvaiDhosham: {
      type: DataTypes.ENUM("Yes", "No", "Don't Know"),
      allowNull: true,
    },
    rahuKetuDhosham: {
      type: DataTypes.ENUM("Yes", "No", "Don't Know"),
      allowNull: true,
    },
    birthTime: { type: DataTypes.STRING(50), allowNull: true },
    birthPlace: { type: DataTypes.STRING(100), allowNull: true },
    horoscopePdfUrl: { type: DataTypes.STRING(255), allowNull: true },
    horoscopeImageUrl: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    sequelize,
    tableName: "horoscope_details",
    timestamps: true,
  },
);

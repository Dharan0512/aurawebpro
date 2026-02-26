import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";

interface UserPhotoAttributes {
  id: number;
  userId: number;
  url: string;
  isMain: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserPhotoCreationAttributes extends Optional<
  UserPhotoAttributes,
  "id" | "isMain" | "order"
> {}

export class UserPhoto
  extends Model<UserPhotoAttributes, UserPhotoCreationAttributes>
  implements UserPhotoAttributes
{
  public id!: number;
  public userId!: number;
  public url!: string;
  public isMain!: boolean;
  public order!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserPhoto.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isMain: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "user_photos",
    timestamps: true,
  },
);

User.hasMany(UserPhoto, { foreignKey: "userId", as: "photos" });
UserPhoto.belongsTo(User, { foreignKey: "userId" });

import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/db.postgres";
import { User } from "./User";

interface InterestAttributes {
  id: number;
  senderId: number;
  receiverId: number;
  status: "pending" | "accepted" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

interface InterestCreationAttributes extends Optional<
  InterestAttributes,
  "id" | "status"
> {}

export class Interest
  extends Model<InterestAttributes, InterestCreationAttributes>
  implements InterestAttributes
{
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public status!: "pending" | "accepted" | "rejected";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Interest.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    receiverId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "interests",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["senderId", "receiverId"],
        name: "unique_interest",
      },
      {
        fields: ["receiverId", "status"],
        name: "idx_interests_receiver",
      },
      {
        fields: ["senderId", "status"],
        name: "idx_interests_sender",
      },
    ],
  },
);

User.hasMany(Interest, { foreignKey: "senderId", as: "SentInterests" });
Interest.belongsTo(User, { foreignKey: "senderId", as: "Sender" });

User.hasMany(Interest, { foreignKey: "receiverId", as: "ReceivedInterests" });
Interest.belongsTo(User, { foreignKey: "receiverId", as: "Receiver" });

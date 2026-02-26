import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const mariadbUri =
  process.env.MARIADB_URI || "mysql://root:1234@localhost:3306/auraweds";

export const sequelize = new Sequelize(mariadbUri, {
  dialect: "mysql",
  logging: false,
});

export const connectMariaDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MariaDB (Sequelize) connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

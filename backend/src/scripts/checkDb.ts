import { User, UserProfile } from "../models/sequelize";
import { sequelize } from "../config/db.postgres";

async function check() {
  try {
    await sequelize.authenticate();
    const users = await User.findAll({
      attributes: ["id", "email", "firstName"],
      raw: true,
    });
    const profiles = await UserProfile.findAll({
      attributes: ["id", "userId"],
      raw: true,
    });

    console.log("--- USERS ---");
    console.table(users);
    console.log("--- PROFILES ---");
    console.table(profiles);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

check();

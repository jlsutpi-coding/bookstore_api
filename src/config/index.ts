import dotenv from "dotenv";
dotenv.config();

export const config = {
  database: {
    url: process.env.DATABASE_URL || "",
    user: process.env.DATABASE_USER || "",
    password: process.env.DATABASE_PASSWORD || "",
    host: process.env.DATABASE_HOST || "",
    port: parseInt(process.env.DATABASE_PORT || "3306", 10),
    name: process.env.DATABASE_NAME || "",
  },
  nodeEnv: process.env.NODE_ENV || "development",
} as const;

if (!config.database.url) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

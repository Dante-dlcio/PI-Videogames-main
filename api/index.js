import dotenv from "dotenv";
import app from "./src/app.js";
import { conn } from "./src/db.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await conn.authenticate();
    console.log("✅ Database connection established");

    await conn.sync({ force: false });
    console.log("✅ Database tables synced");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

startServer();

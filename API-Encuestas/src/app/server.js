import express from "express";
import appConfig from "./app.config.js";
import "../database/db.config.js";

async function server() {
  try {
    const app = express();
    const PORT = process.env.PORT || 3000;

    appConfig(app);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error on server.js: ", error);
  }
}

export default server;

import { createApp } from "../server/src/app.js";

const app = createApp({
  allowedOrigins: [
    "http://localhost:5173",
    process.env.FRONTEND_URL
  ].filter(Boolean)
});

export default app;

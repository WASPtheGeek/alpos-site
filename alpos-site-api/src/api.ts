import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import i18next from "i18next";
import middleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend";
import path from "path";
import localizationRouter from "./routes/localizationRoutes";

i18next
  .use(middleware.LanguageDetector) // Enables automatic language detection
  .use(Backend)
  .init({
    backend: {
      loadPath: path.join(
        process.cwd(),
        "src/locales",
        "{{lng}}",
        "{{ns}}.json"
      ), // Path to translation files
    },
    detection: {
      order: ["querystring", "cookie"], // Priority: URL query string first, then cookies
      caches: ["cookie"],
    },
    fallbackLng: "lv",
    preload: ["lv", "en", "ru"],
  });

const app = express();
dotenv.config(); // Load environment variables from .env file

// json
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// localization
app.use(middleware.handle(i18next));

// cors (make sure you define cors before initializing routes :D)
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.ACCESS_CONTROL_ALLOW_ORIGIN!
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// register routes
app.use("/localizations", localizationRouter);

// start server
const PORT = process.env.PORT!;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

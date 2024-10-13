import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";
import {
  authRouter,
  categoryRouter,
  contactRouter,
  localizationRouter,
  postRouter,
  productRouter,
  textToDisplayRouter,
  userRouter,
} from "./routes";

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
  res.setHeader("Access-Control-Allow-Headers", [
    "Content-Type",
    "Accept-Language",
  ]);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// register routes
app.use("/localizations", localizationRouter);
app.use("/contacts", contactRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/textToDisplay", textToDisplayRouter);

// start server
const PORT = process.env.PORT!;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

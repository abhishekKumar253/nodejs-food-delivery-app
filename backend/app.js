import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes import
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import resturantRoutes from "./routes/resturant.routes.js";
import categoryRoutes from "./routes/catgeory.routes.js";
import foodRoutes from "./routes/food.routes.js";

// routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/resturant", resturantRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/food", foodRoutes);

export { app };

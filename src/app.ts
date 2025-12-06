import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

import commentRoutes from "./api/v1/routes/commentRoutes";
import stemRoutes from "./api/v1/routes/stemRoutes";
import trackRoutes from "./api/v1/routes/trackRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import userRoutes from "./api/v1/routes/userRoutes";

import setupSwagger from "../config/swagger";

const app: Express = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/stems", stemRoutes);
app.use("/api/v1/tracks", trackRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/vi/user", userRoutes);

setupSwagger(app);

export default app;
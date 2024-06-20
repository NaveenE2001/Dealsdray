import express from "express";
import connectToDB from "./db.js";
import AuthRouter from "./routers/authRouter.js";
import bodyParser from "body-parser";
import userRoutes from "./routers/usrRouter.js";
import cors from "cors";

connectToDB();

const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world from backend");
});

app.use("/api/v1", AuthRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`connect succsfully in the port http://localhost:${port}`);
});

import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Server");
});

app.listen(port, () => {
  console.log(`Server is up at http://localhost:${port}`);
});

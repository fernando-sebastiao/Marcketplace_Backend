import express, { Request, Response } from "express";
import { router } from "./routes";
const app = express();

app.use(express.json());
app.use(router);
app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello word" });
});

const PORT = 3333;
app.listen(3333, () => {
  console.log("Server Started in 3333 PORT");
});

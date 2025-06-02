import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { cors } from "hono/cors";
import { snippetRouter } from "./routes/snippet";

const app = new Hono();

app.use("/*", cors());

app.route("/api/v1/user", userRouter);
app.route("/api/v1/snippet", snippetRouter);

export default app;

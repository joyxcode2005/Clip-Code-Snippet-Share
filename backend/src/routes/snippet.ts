import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createSnippetInput } from "@joyxcoder/clip-code-common";

export const snippetRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware for authenticated routes
snippetRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");

  if (!jwt) {
    c.status(401);
    return c.json({
      message: "Unauthorized",
    });
  }

  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);

  if (!payload) {
    c.status(401);
    return c.json({
      message: "Unauthorized",
    });
  }

  c.set("userId", String(payload.id));
  await next();
});

snippetRouter.post("/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");

  const { success, error } = createSnippetInput.safeParse(body);

  if (!success) {
    return c.json(
      {
        message: error,
      },
      400
    );
  }

  try {
    const snippet = await prisma.snippet.create({
      data: {
        title: body.title,
        code: body.code,
        category: body.category,
        language: body.language,
        userId: userId,
      },
    });

    if (snippet) {
      c.status(200);
      return c.json({
        message: "Snippted created!!",
        id: snippet.id,
      });
    } else {
      c.status(500);
      return c.json({
        message: "Error in creating snippet",
      });
    }
  } catch (error) {
    c.status(500);
    return c.json({
      message: "Error in creating snippet",
      error,
    });
  }
});

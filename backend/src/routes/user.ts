import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import bcrypt from "bcryptjs";
import { sign, verify } from "hono/jwt";
import { registerInput, loginInput } from "@joyxcoder/clip-code-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// route to signup a new user
userRouter.post("/register", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Getting user details from body
  const body = await c.req.json();
  const { success, error } = registerInput.safeParse(body);

  // Input validation using zod types
  if (!success) {
    return c.json(
      {
        error: error.issues[0].message,
      },
      400
    );
  }

  try {
    // Hasing the password of the user
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        password: hashedPassword,
      },
    });

    if (user) {
      // creating jwt token
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);

      c.status(200);
      return c.json({
        message: "User created successfully!!",
        token,
      });
    } else {
      c.status(500);
      return c.json({
        message: "Error while signing up!!",
      });
    }
  } catch (error) {
    c.status(500);
    c.json({
      message: "Error while signing up!!",
    });
  }
});

// route to signin an existing user
userRouter.post("/login", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  // Input validation using zod types
  const { success, error } = loginInput.safeParse(body);

  if (!success) {
    return c.json(
      {
        message: error.issues[0].message,
      },
      400
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return c.json({ message: " Invalid credentials" }, 401);
    }

    const passwordMatch = await bcrypt.compare(body.password, user.password);

    if (!passwordMatch) {
      return c.json({ message: " Invalid credentials" }, 401);
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json(
      {
        message: "Login successfully!",
        token,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: "Error while signing up!!",
      },
      500
    );
  }
});

// route to get user info
userRouter.get("/info", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const jwt = c.req.header("Authorization");

  if (!jwt) {
    c.status(401);
    return c.json({
      message: "Unauthorized",
    });
  }

  const token = jwt.split(" ")[1];
  const userId = await verify(token, c.env.JWT_SECRET);


  if (!userId) {
    c.status(401);
    return c.json({
      message: "Unauthorized",
    });
  }

  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: String(userId.id),
      },
    });

    c.status(200);
    return c.json({
      userData: userData,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      message: "Error fetching your details",
    });
  }
});

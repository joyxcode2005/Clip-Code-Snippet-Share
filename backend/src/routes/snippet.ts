import { Category, Language, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import {
  createSnippetInput,
  updateSnippetInput,
} from "@joyxcoder/clip-code-common";

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

// Route to create a snippet
snippetRouter.post("/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");

  if (!userId) {
    return c.json({ message: "Unauthorized: User ID not found." }, 401);
  }
  console.log("Create Endpoint Body: ", body);

  const { success, error } = createSnippetInput.safeParse(body);

  if (!success) {
    return c.json(
      {
        message: "Error from zod : ",
        error,
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
        tags: body.tags ?? [],
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

// Route to get all the snippets created with pagination
snippetRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Gets the page no. from query parameter
  const page = parseInt(c.req.query("page") || "1");
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const snippets = await prisma.snippet.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount = await prisma.snippet.count();

    return c.json({
      page,
      totalPages: Math.ceil(totalCount / limit),
      data: snippets,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      message: "Error fetching snippets!!",
      error,
    });
  }
});

// Route to get all the snippets created by the user with pagination
snippetRouter.get("/user-bluk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const page = parseInt(c.req.query("page") || "1");

  const limit = 10;
  const skip = (page - 1) * limit;

  const snippets = await prisma.snippet.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: userId,
    },
    select: {
      id: true,
      title: true,
      code: true,
      createdAt: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  const totalCount = await prisma.snippet.count();

  return c.json({
    page,
    totalPages: Math.ceil(totalCount / limit),
    data: snippets,
  });
});

// Route to search snippets based on language and category
snippetRouter.get("/search", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const language = (c.req.query("language") || "JAVASCRIPT") as Language;
  const category = (c.req.query("category") || "DSA") as Category;

  try {
    const snippets = await prisma.snippet.findMany({
      where: {
        category,
        language,
      },
      select: {
        id: true,
        title: true,
        code: true,
        createdAt: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (snippets) {
      c.status(200);
      return c.json({
        snippets,
      });
    } else {
      c.status(500);
      return c.json({
        message: "Failed to fetch snippets",
      });
    }
  } catch (error) {
    c.status(500);
    return c.json({
      message: "Some error occured!!",
      error,
    });
  }
});

// Route to update an existing snippet
snippetRouter.put("/update", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success, error } = updateSnippetInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: error,
    });
  }

  try {
    const updatedSnippet = await prisma.snippet.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        code: body.code,
      },
    });

    if (updateSnippetInput) {
      c.status(200);
      return c.json({
        message: "Snippet updated successfully!!!",
        snippet: updateSnippetInput,
      });
    } else {
      c.status(500);
      return c.json({
        message: "Failed to update snippet",
      });
    }
  } catch (error) {
    c.status(500);
    return c.json({
      message: "Failed to update snippet",
    });
  }
});

// Route to delete an existing snippet
snippetRouter.delete("/delete/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Get the id of the snippet from url
  const snippetdId = c.req.param("id");

  try {
    const deletedSnippet = await prisma.snippet.delete({
      where: {
        id: snippetdId,
      },
    });

    if (deletedSnippet) {
      c.status(200);
      return c.json({
        message: "Snippet has been deleted successfully!!",
        deletedSnippet: deletedSnippet,
      });
    } else {
      c.status(500);
      return c.json({
        message: "Failed to delete snippet",
      });
    }
  } catch (error) {
    c.status(500);
    return c.json({
      message: "Failed to delete snippet",
    });
  }
});

// Route to get a snippet info
snippetRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const snippet = await prisma.snippet.findFirst({
      where: {
        id: id,
      },
      select: {
        title: true,
        code: true,
        category: true,
        language: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    if (snippet) {
      c.status(200);
      return c.json({
        snippet,
      });
    } else {
      c.status(500);
      return c.json({
        message: "Error getting the snippet",
      });
    }
  } catch (error) {
    c.status(500);
    return c.json({
      message: "Error getting snippet",
      error,
    });
  }
});

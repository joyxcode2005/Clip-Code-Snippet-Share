import z, { string } from "zod";

export const registerInput = z.object({
  email: z.string().email(),
  username: z.string().min(6, "Username should be atleast 6 characters long"),
  password: z.string().min(6, "Password should be atleast 6 characters long"),
});

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password should be atleast 6 characters long"),
});

export const createSnippetInput = z.object({
  title: z.string().min(12, "Title should be atleast 12 characters long"),
  code: z.string(),
  language: z.enum([
    "javascript",
    "python",
    "html",
    "css",
    "sql",
    "markdown",
    "json",
  ]),
  category: z.enum(["DSA", "Web Dev", "Devops", "AI/ML"]),
  tags: z
    .enum([
      "ALGORITHM",
      "DATA_STRUCTURE",
      "REACT",
      "DOCKER",
      "MACHINE_LEARNING",
      "SCRIPTING",
    ])
    .optional(),
});

export const updateSnippetInput = z.object({
  id: z.string(),
  title: z.string().min(12, "Title should be atleast 12 characters long"),
  code: z.string(),
});

export type RegisterInputType = z.infer<typeof registerInput>;
export type LoginInputType = z.infer<typeof loginInput>;

export type CreateSnippetInput = z.infer<typeof createSnippetInput>;
export type UpdateSnippetInput = z.infer<typeof updateSnippetInput>;

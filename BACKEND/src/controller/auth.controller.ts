import type { Context } from "hono";
import wrapAsync from "@/utils/tryCatchWrapper";
import { registerUser } from "@/services/auth.service";
import { cookieOptions } from "@/config/config";

export const register_user = wrapAsync(async (c: Context) => {
  const { name, email, password } = await c.req.json();
  const token = await registerUser(name, email, password); 
  c.cookie("accessToken", token, cookieOptions);

  c.status(200);

  return c.json({message: "User registered successfully"});
});

export const login_user = wrapAsync(async (c: Context) => {
  const { email, password } = await c.req.json();
  const user = await loginUser(email, password);
  return c.json({ message: "User logged in successfully", user });
});

export const logout_user = wrapAsync(async (c: Context) => {
  return c.text("logout");
});

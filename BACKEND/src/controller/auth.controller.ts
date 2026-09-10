import type { Context } from "hono";
import { setCookie } from "hono/cookie";
import wrapAsync from "@/utils/tryCatchWrapper";
import { registerUser, loginUser } from "@/services/auth.service";
import { cookieOptions } from "@/config/config";

export const register_user = wrapAsync(async (c: Context) => {
  const { name, email, password } = await c.req.json();
  const {token, user} = await registerUser(name, email, password);
  c.set("user", user);
  setCookie(c, "accessToken", token, cookieOptions);

  c.status(200);

  return c.json({ message: "User registered successfully" });
});

export const login_user = wrapAsync(async (c: Context) => {
  const { email, password } = await c.req.json();
  const  {token, user} = await loginUser(email, password);
  c.set("user", user);
  setCookie(c, "accessToken", token, cookieOptions);
  return c.json({ message: "User logged in successfully" });
});

export const logout_user = wrapAsync(async (c: Context) => {
  setCookie(c, "accessToken", "", { ...cookieOptions, maxAge: 0 });
  return c.text("User logged out successfully");
});

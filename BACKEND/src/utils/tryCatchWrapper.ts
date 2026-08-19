import type { Context, Next } from "hono";

export default function wrapAsync(
  fn: (c: Context, next: Next) => Promise<Response>
) {
  return async (c: Context, next: Next) => {
    try {
      return await fn(c, next);
    } catch (error) {
      throw error;
    }
  };
}
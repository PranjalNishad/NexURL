/**
 * NexURL backend API — short URL creation.
 *
 * Verified backend contract (POST http://localhost:3000/api/create):
 * - No authentication.
 * - Request:  { "url": string }  (Content-Type: application/json)
 * - Success:  HTTP 200, Content-Type: text/plain, body is the short URL string.
 * - Error:    HTTP non-2xx, body is JSON: { "success": false, "message": string }
 */

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

interface ApiErrorBody {
  success?: boolean;
  message?: string;
}

/** Creates a short URL for the given long URL. Resolves with the short URL string. */
export async function createShortUrl(url: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }

  // Success response is plain text, not JSON.
  return response.text();
}

/** Parses the backend's JSON error body, falling back to a generic message. */
async function extractErrorMessage(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") ?? "";
  const status = response.status;

  if (contentType.includes("application/json")) {
    try {
      const body = (await response.json()) as ApiErrorBody;
      if (body && typeof body.message === "string" && body.message.length > 0) {
        return body.message;
      }
    } catch {
      // fall through to the generic message
    }
  }

  return `Request failed with status ${status}`;
}

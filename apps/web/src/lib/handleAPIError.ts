import * as z from "zod";

export function handleAPIError(error: unknown, message: string): Response {
  if (error instanceof z.ZodError) {
    return new Response(JSON.stringify(error.issues), { status: 422 });
  }

  return new Response(message, {
    status: 500,
  });
}

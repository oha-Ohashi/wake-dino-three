import { serve } from "https://deno.land/std@0.204.0/http/server.ts";

const handler = (req: Request): Response => {
  // JSONデータを返す
  const jsonResponse = { message: "Hello, Deno!" };
  return new Response(JSON.stringify(jsonResponse), {
    headers: { "Content-Type": "application/json" },
  });
};

console.log("HTTP server is running at http://localhost:8000");
await serve(handler, { port: 8000 });

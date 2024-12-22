import type { APIRoute } from "astro";
import { PERSONS } from "../../database/persons";

export const prerender = false;

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify(PERSONS), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

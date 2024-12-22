import type { APIRoute } from "astro";
import { db, Persons } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async () => {
  const persons = await db.select().from(Persons);

  return new Response(JSON.stringify(persons), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

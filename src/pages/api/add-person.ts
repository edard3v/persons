import type { APIRoute } from "astro";
import { db, Persons } from "astro:db";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const newPerson = await request.json();

  await db.insert(Persons).values({ id: crypto.randomUUID(), ...newPerson });

  return new Response(
    JSON.stringify({ msg: `${newPerson.name} fue agg correctamente.` }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
};

import type { APIRoute } from "astro";
import { PERSONS } from "../../database/persons";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const newPerson = await request.json();

  PERSONS.push({ id: crypto.randomUUID(), ...newPerson });

  return new Response(
    JSON.stringify({ msg: `${newPerson.name} fue agg correctamente.` }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
};

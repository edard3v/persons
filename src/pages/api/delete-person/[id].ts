import type { APIRoute } from "astro";
import { PERSONS } from "../../../database/persons";

export const prerender = false;

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params as { id: string };

  const index = PERSONS.findIndex((person) => person.id == id);
  PERSONS.splice(index, 1);

  return new Response(
    JSON.stringify({
      msg: `La persona con id: ${id} fue eliminada correctamente.`,
    }),
    {
      status: 201,
      headers: { "Content-Type": "application/json" },
    }
  );
};

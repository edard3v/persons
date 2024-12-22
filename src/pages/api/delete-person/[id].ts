import type { APIRoute } from "astro";
import { PERSONS } from "../../../database/persons";
import { db, eq, Persons } from "astro:db";

export const prerender = false;

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params as { id: string };

  const [personDeleted] = await db
    .delete(Persons)
    .where(eq(Persons.id, id))
    .returning();

  if (!personDeleted)
    return new Response(
      JSON.stringify({
        msg: `No existe una persona con id: ${id}`,
      }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );

  return new Response(
    JSON.stringify({
      msg: `La persona con id: ${id} fue eliminada correctamente.`,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

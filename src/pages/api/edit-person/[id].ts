import type { APIRoute } from "astro";
import { db, eq, Persons } from "astro:db";

export const prerender = false;

export const PUT: APIRoute = async ({ params, request }) => {
  const body = (await request.json()) as Body;
  const { id } = params as { id: string };

  const { rowsAffected } = await db
    .update(Persons)
    .set({ ...body })
    .where(eq(Persons.id, id));

  if (!rowsAffected)
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
      msg: `La persona con id: ${id} fue actualizada correctamente.`,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

type Body = {
  name?: string;
  age?: number;
  tel?: string;
  countryCode?: string;
};

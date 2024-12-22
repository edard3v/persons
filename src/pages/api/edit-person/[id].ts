import type { APIRoute } from "astro";
import { PERSONS } from "../../../database/persons";

export const prerender = false;

export const PUT: APIRoute = async ({ params, request }) => {
  const body = (await request.json()) as Body;
  const { id } = params as { id: string };

  const person = PERSONS.find((person) => person.id === id);
  const oldPerson = { ...person };

  if (!person)
    return new Response(
      JSON.stringify({ msg: `No existe persona con id: ${id}` }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );

  person.age = body.age ?? person.age;
  person.countryCode = body.countryCode ?? person.countryCode;
  person.name = body.name ?? person.name;
  person.tel = body.tel ?? person.tel;

  return new Response(
    JSON.stringify({
      oldPerson,
      newPerson: person,
    }),
    {
      status: 201,
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

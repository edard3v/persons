import type { APIRoute } from "astro";
import { count, db, Persons } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);

  let page = Number(url.searchParams.get("page"));
  if (!page) page = 1;

  const limit = 6;

  const [records] = await db.select({ count: count() }).from(Persons);
  const totalPages = Math.ceil(records.count / limit) || 1;

  const persons = await db
    .select()
    .from(Persons)
    .limit(limit)
    .offset((page - 1) * limit);

  return new Response(
    JSON.stringify({
      page,
      limit,
      totalPages,
      records: persons,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};

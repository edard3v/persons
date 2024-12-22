import { db, Persons } from "astro:db";
import { PERSONS } from "../src/database/persons";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Persons).values(PERSONS);
}

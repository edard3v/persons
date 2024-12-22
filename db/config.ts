import { column, defineDb, defineTable } from "astro:db";

const Persons = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    age: column.number(),
    countryCode: column.text(),
    tel: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Persons,
  },
});

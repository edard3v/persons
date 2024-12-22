# migra la db a turso

bun astro db push --remote

# push seed a la db en turso

bun astro db execute db/seed.ts --remote
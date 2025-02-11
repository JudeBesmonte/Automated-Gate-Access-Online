# DEPENDENCIES

## Next.js

Automatic Installation

```shell
$ npx create-next-app@14.2.24 .

✔ Would you like to use TypeScript? Yes
✔ Would you like to use ESLint? Yes
✔ Would you like to use Tailwind CSS? Yes
✔ Would you like to use `src/` directory? No
✔ Would you like to use App Router? (recommended) Yes
✔ Would you like to customize the default import alias (@/*)? No

$ node -v > .nvmrc
```

[How to set up a new Next.js project](https://nextjs.org/docs/app/getting-started/installation)

## shadcn

[Install and configure Next.js](https://ui.shadcn.com/docs/installation/next)

```shell
npx shadcn@latest init -d
```

## tailwindcss

Install Tailwind CSS

```shell
npm install tailwindcss @tailwindcss/postcss postcss
```

Add Tailwind to your PostCSS configuration

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}
```

[Get started with Tailwind CSS](https://tailwindcss.com/docs/installation/using-postcss)

## Supabase Auth

```shell
npm install @supabase/supabase-js @supabase/ssr
```

## prisma

Install Prisma ORM

```shell
npm install prisma --save-dev
npm install tsx --save-dev
# If you're not using a Prisma Postgres database, you won't need the @prisma/extension-accelerate package.
npm install @prisma/extension-accelerate
```

Then, run prisma init to initialize Prisma ORM in your project.

```shell
npx prisma init
npx prisma migrate dev --name init
```

Seed your database

```shell
npx prisma db seed
```

Set up Prisma Client

```shell
npm install @prisma/client
```

[ORM Quickstarts Prisma](https://supabase.com/docs/guides/database/prisma)

## Zustand

Bear necessities for state management in React

```shell
npm i zustand
```

## React Query

Powerful asynchronous state management, server-state utilities and data fetching for the web. TS/JS, React Query, Solid Query, Svelte Query and Vue Query.

```shell
npm i @tanstack/react-query
```

## ESLint

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

```shell
npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks
npm install --save-dev eslint-plugin-import eslint-import-resolver-typescript
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev @next/eslint-plugin-next
```

Find and fix problems in your JavaScript code.

```shell
npx eslint ./app
npx eslint --fix ./{app,components,config,context,hooks,lib,schemas,store,types,utils}
```

## Prettier

Prettier is an opinionated code formatter.

```shell
npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier
npm install --save-dev eslint-plugin-tailwindcss prettier-plugin-tailwindcss
npm install --save-dev prettier-plugin-prisma
```

To format a file in-place.

```shell
npx prettier --check "./app/**/*.{ts,tsx}"
npx prettier --write "./{app,components,config,context,hooks,lib,schemas,store,types,utils}/**/*.{ts,tsx}"
```

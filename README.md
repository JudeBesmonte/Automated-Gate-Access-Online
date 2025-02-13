# nextjs14-supabasejs2-dashboard-v2

This is a dashboard starter template for the [NextJS](https://nextjs.org) 14 based on [Supabase](https://supabase.com).

## Denpendencies

- Next.js 14
- Tailwindcss
- Shadcn
- Supabase Auth + Supabase CLI
- Prisma
- Zustand
- React Query

## Folder and file Structure

The folder and file structure is based on nextjs app router [next.js project structure](https://nextjs.org/docs/getting-started/project-structure).

```txt
.
├── actions/                    # Server Actions
├── app/                        # App Router
│   └── api/
│       ├── auth/               # Authentication
│       └── v1/                 # Public APIs
├── components/                 # React components
├── config/                     # Configuration for site
├── context/                    # Context
├── docs/                       # Documents
├── hooks/                      # Hooks
├── lib/                        # Application specific libraries & Utility functions
├── prisma/                     # Prisma Schema Location and Configuration
├── public/                     # Static assets to be served
│   └── [locales]/              # Internationalization
├── queries/                    # APIs
├── schemas/                    # Schema validations
├── screenshots/                # Screenshots
├── store/                      # State
├── supabase/                   # Supabase CLI
├── types/                      # Type definitions
└── package.json
```

## Getting Started

Clone the repository to the current directory.

```shell
git clone https://github.com/w3labkr/nextjs14-supabase-dashboard.git .
```

Install all modules listed as dependencies.

```shell
npm install
```

Copy of the `.env.example` if the `.env` doesn't exist.

```shell
cp .env.example .env
```

Create an SQL migration file and execute it.

```shell
npx prisma migrate dev --name init
```

Start the development server.

```shell
npm run dev
```

## License

This software license under the [MIT License](LICENSE).

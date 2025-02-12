# nextjs14-supabasejs2-dashboard-v2

This is a dashboard starter template for the [NextJS](https://nextjs.org) 14 based on [Supabase](https://supabase.com).

## Denpendencies

- Next.js 14
- Tailwindcss
- Shadcn
- Supabase Auth
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
├── lib/                        # Application specific libraries
├── prisma/                     # Prisma Schema Location and Configuration
├── public/                     # Static assets to be served
│   └── [locales]/              # Internationalization
├── queries/                    # APIs
├── schemas/                    # Schema validations
├── screenshots/                # Screenshots
├── store/                      # State
├── types/                      # Type definitions
├── utils/                      # Utility functions
└── package.json
```

## License

This software license under the [MIT License](LICENSE).

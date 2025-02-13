import 'next'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_URL: string

      NEXT_PUBLIC_SUPABASE_URL: string
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string

      DATABASE_URL: string
      DIRECT_URL: string

      AUTH_GITHUB_ID: string
      AUTH_GITHUB_SECRET: string
      AUTH_GOOGLE_ID: string
      AUTH_GOOGLE_SECRET: string
      AUTH_FACEBOOK_ID: string
      AUTH_FACEBOOK_SECRET: string
      AUTH_KAKAO_ID: string
      AUTH_KAKAO_SECRET: string
      AUTH_TWITTER_ID: string
      AUTH_TWITTER_SECRET: string

      [key: string]: string | undefined
    }
  }
}

// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      REDIRECT_URI: string;
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
      SMT_API_PASSWORD: string;
      SMT_API_USERNAME: string;
      SMT_API_URL: string;
    }
  }
  
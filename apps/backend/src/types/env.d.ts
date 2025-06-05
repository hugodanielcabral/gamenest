export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN: string;
      CLIENT_ID: string;
      CLIENT_SECRET: string;
      FRONTEND_URL: string;
      ACCESS_TOKEN_SEED: string;
      REFRESH_TOKEN_SEED: string;
      DATABASE_URL: string;
      STEAM_API_KEY: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}

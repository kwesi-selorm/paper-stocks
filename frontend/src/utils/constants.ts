export const apiUrl =
  process.env.NODE_ENV == "development"
    ? process.env.LOCALHOST_URL ?? "http://localhost:8000/api"
    : process.env.HEROKU_URL

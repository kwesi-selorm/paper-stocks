export const apiUrl =
  process.env.NODE_ENV == "development"
    ? process.env.NEXT_PUBLIC_LOCALHOST_URL ?? "http://localhost:8000/api"
    : process.env.NEXT_PUBLIC_HEROKU_URL

export const newStockInitialInput = {
  symbol: "",
  name: "",
  position: 0,
  amountInvested: 0
}

export const SignInInputPatternRules = [
  {
    pattern: /.{8,}/,
    message: "Password must be at least 8 characters long"
  },
  {
    pattern: /[A-Z]/,
    message: "Password must contain at least one uppercase letter"
  },
  {
    pattern: /[a-z]/,
    message: "Password must contain at least one lowercase letter"
  },
  {
    pattern: /[0-9]/,
    message: "Password must contain at least one number"
  },
  {
    pattern: /[!@#$%^&*]/,
    message: "Password must contain at least one special character"
  }
]

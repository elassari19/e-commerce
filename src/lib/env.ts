import zod from "zod"

const envSchema = zod.object({
  DATABASE_URL: zod.string().nonempty(),

  EMAIL_SERVER_HOST: zod.string().nonempty(),
  EMAIL_SERVER_PORT: zod.string().nonempty(),
  EMAIL_SERVER_USER: zod.string().nonempty(),
  EMAIL_SERVER_PASSWORD: zod.string().nonempty(),
  EMAIL_FROM: zod.string().nonempty(),

  NEXTAUTH_URL: zod.string().nonempty(),
  NEXTAUTH_SECRET: zod.string().nonempty(),

  GOOGLE_CLIENT_ID: zod.string().nonempty(),
  GOOGLE_CLIENT_SECRET: zod.string().nonempty(),
})

export const env = envSchema.parse(process.env)
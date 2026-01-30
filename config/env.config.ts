import "server-only"

import { envSchema } from "@/lib/zod/schema"

export const envVariables = envSchema.parse(process.env)
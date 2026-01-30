import "server-only"

import { Redis } from "@upstash/redis"
import { envVariables } from "@/config/env.config"

export const redis = new Redis({
    url: envVariables.UPSTASH_URL,
    token: envVariables.UPSTASH_TOKEN
})
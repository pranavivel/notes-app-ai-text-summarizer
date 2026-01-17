import {Ratelimit} from '@upstash/ratelimit'
import {Redis} from '@upstash/redis'
import dotenv from "dotenv"
dotenv.config()

// create a ratelimiter to allow 100 reqs per 1 minite
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "20 s")
})

export default ratelimit;
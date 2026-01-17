import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res, next) => {
// In the .limit() can put userid
    try {
        const {success} = await ratelimit.limit("ratelimit")

        if (!success) {
            return res.status(429).json({message: "Too many requests. Please try again later."})
        }
        next()
    } catch (error) {
        console.log("Rate limit error, error")
        next(error)
    }

}

export default rateLimiter
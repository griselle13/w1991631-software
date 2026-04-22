import ratelimit from "../config/upstash.js"

// const rateLimiter = async (req, res, next) => {
//     try {
//         const { success } = await ratelimit.limit("my-limit-key")

//         if (!success) {
//             return res.status(429).json({
//                 messsage: "Too many requests, please try again later"
//             })
//         }

//         next()
//     } catch (error) {
//         console.log("Rate limit error", error)
//         next(error)
//     }
// }

const rateLimiter = async (req, res, next) => {
    return next(); // bypass Upstash completely
};

export default rateLimiter
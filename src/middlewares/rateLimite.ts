import rateLimit from 'express-rate-limit';

const time = 60 *1000;
//15min

const limiter = rateLimit({
  windowMs:time,
  max:1000,
  message:"Too many request, please try again later.",
})

export default limiter;
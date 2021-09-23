import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const token = req.header("x-api-token")
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.authenticateMessage = `Welcome ${decoded.email}, you are authenticated`
        req.userEmail = decoded.email;
        next()
      } catch(error) {
        console.log(error)
        res.send(`Go away, you are not authenticated!`);
      }
}
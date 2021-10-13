import jwt from 'jsonwebtoken';
//Changed email to name because in JSON log was written name: "<customer email>" line 8 and 9
export const authenticateToken = (req, res, next) => {
    const token = req.header("x-api-token")
    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        console.log("(middleware)decoded=>"+JSON.stringify(decoded));
        req.authenticateMessage = `Welcome ${decoded.name}, you are authenticated`
        req.userEmail = decoded.name;
        next()
      } catch(error) {
        console.log(error)
        res.send(`Go away, you are not authenticated!`);
      }
}
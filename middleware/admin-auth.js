const jwt = require('jsonwebtoken');

/**This middleware validates the token stored in the request headers
 * @param token - Expects a JWT in the Authorization field of the request headers.
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        if(decoded.isAdmin === false){
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }
        console.log(decoded);
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
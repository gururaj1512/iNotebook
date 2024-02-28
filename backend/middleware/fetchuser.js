var jwt = require('jsonwebtoken');
const JWT_SECERET = "LionelMessiGOAT"


const fetchuser = (req, res, next) => {
    // Gets the user from jwt token and adds id to request object
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({error : "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECERET)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({error : "Please authenticate using a valid token"})
    }
    
}

module.exports = fetchuser;
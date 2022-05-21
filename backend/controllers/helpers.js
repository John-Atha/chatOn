const JsonWebToken = require("jsonwebtoken");

const getRequestUser = (req) => {
    const { headers } = req;
    console.log({ headers });
    const bearer = headers['authorization'];
    if (!bearer?.includes('Bearer ')) {
        return null;
    }
    const token = bearer.slice(7);
    const decoded = JsonWebToken.verify(token, process.env.SECRET_KEY);
    return decoded;
}

module.exports = getRequestUser;
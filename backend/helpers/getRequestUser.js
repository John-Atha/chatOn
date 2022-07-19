const JsonWebToken = require("jsonwebtoken");

const getRequestUser = (req) => {
    const { headers } = req;
    const bearer = headers['authorization'];
    console.log({ bearer })
    if (!bearer?.includes('Bearer ')) {
        return null;
    }
    try {
        const token = bearer.slice(7);
        const decoded = JsonWebToken.verify(token, process.env.SECRET_KEY);
        return decoded;
    }
    catch (err) {
        return null;
    }
}

module.exports = getRequestUser;
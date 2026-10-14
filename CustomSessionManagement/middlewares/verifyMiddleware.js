const serverSession = require('./sessionStore');

const TokenCookie = 'token';

function sessionMiddleware(req, res, next) {
    const sessionId = req.cookies[TokenCookie];

    if (!sessionId || !serverSession[sessionId]) {
        req.session = null;
        return next();
    }

    req.session = serverSession[sessionId];

    next();
}

module.exports = sessionMiddleware;
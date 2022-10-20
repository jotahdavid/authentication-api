const Token = require('../utils/token');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token was not provided' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme) || !token) {
    return res.status(401).json({ error: 'Token malformatted' });
  }

  try {
    const payload = await Token.verify(token);

    req.userId = payload.sub;
  } catch {
    return res.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
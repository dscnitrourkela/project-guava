const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const fetch = require('node-fetch');

const AUTH0_DOMAIN = 'signit.eu.auth0.com';

const addCreatedAndUpdatedBy = (decodedToken) => {
  const userID = decodedToken?.sub;
  return { updatedBy: userID, createdBy: userID };
};

const addUpdatedBy = (decodedToken) => {
  const userID = decodedToken?.sub;
  return { updatedBy: userID };
};

const authClient = jwksClient({
  jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const getKey = (header, callback) => {
  authClient.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
};

const decodeTokenFromHeader = async (authHeader) => {
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        algorithms: ['RS256'],
        audience: [`https://${AUTH0_DOMAIN}/userinfo`],
        issuer: `https://${AUTH0_DOMAIN}/`,
      },
      (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    );
  }).catch(() => null);
  if (!decodedToken) {
    return { decodedToken };
  }
  const userDetailsByIdUrl = `https://${AUTH0_DOMAIN}/api/v2/users/${decodedToken.sub}`;
  const userDetails = await fetch(userDetailsByIdUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch(() => null);

  return {
    email: userDetails?.email,
    email_verified: userDetails?.email_verified,
    ...decodedToken,
  };
};

module.exports = { addCreatedAndUpdatedBy, addUpdatedBy, decodeTokenFromHeader };

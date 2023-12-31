import createHash from '../common/createHash.js';

/**
 * This function signs a token with the given payload and key,
 * and is customizable with the options parameter. Can be called asynchronously by providing a callback.
 * 
 * @param {*} payload claims to be sent in the token, is a json object
 * @param {string} key secret value used to sign the token
 * @param {*} [options={ algorithm: 'HS256', expiresIn, notBefore, expTime }] options for the token
 * @param {Function} callback if provided, the token will be signed asynchronously and the callback will be called at the end
 * @returns {string} the signed token in format: "header.payload.signature"
 */
export const sign = (payload, key, { algorithm = "HS256", expiresIn, notBefore, expTime } = {}, callback=()=>{}) => {
  const header = {
    'alg': algorithm,
    'typ': 'JWT'
  }

  //add time info to payload
  const now = Math.floor(Date.now() / 1000);
  expTime = expTime ? (expiresIn ? now + expiresIn : expTime) : undefined;
  notBefore = notBefore ? now + notBefore : undefined;

  payload = {
    ...payload,
    ...(expTime !== undefined && { exp: expTime }),
    ...(notBefore !== undefined && { nbf: notBefore }),
  };

  //setup crypto
  const preHash = `${Buffer.from(JSON.stringify(header)).toString('base64url')}.${Buffer.from(JSON.stringify(payload)).toString('base64url')}`;
  const signature = createHash(key, algorithm, preHash);
  const token = `${preHash}.${signature}`;

  return token;
};
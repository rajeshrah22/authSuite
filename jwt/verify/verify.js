import createHash from '../common/createHash.js';

/**
 * Verifies the authenticity of a JSON Web Token (JWT) using the provided key and algorithm.
 * @param {string} token - The JWT to be verified.
 * @param {string} key - The key used to sign the JWT.
 * @param {Object} options - Optional parameters for verification.
 * @param {string} options.algorithm - The algorithm used to sign the JWT. Default is "HS256".
 * @param {Function} callback - Optional callback function to be executed after verification.
 * @returns {boolean} - Returns true if the JWT is valid, false otherwise.
 */
export const verify = (token, key, { algorithm = "HS256" } = {}, callback=()=>{}) => {
  const [header, payload, signature] = token.split('.');

  const preHash = `${header}.${payload}`;
  const expectedSignature = createHash(key, algorithm, preHash);

  return signature === expectedSignature;
}
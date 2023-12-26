import crypto from 'crypto';

/**
 * Verifies a payload using a given key and algorithm. Can be called asynchronously by providing a callback.
 *
 * @param {Object} payload - The payload to verify.
 * @param {string} key - The key to use for verification.
 * @param {Object} [options={ algorithm: 'HS256' }] - Optional settings.
 * @param {string} options.algorithm - The algorithm to use for verification. Defaults to 'HS256'.
 * @param {Function} [callback=()=>{}] - An optional callback function to be executed after verification.
 */
export const verify = (token, key, { algorithm = "HS256" } = {}, callback=()=>{}) => {
  const [header, payload, signature] = token.split('.');

  switch(algorithm) {
    case 'HS256':
      algorithm = 'sha256';
      break;
    case 'HS384':
      algorithm = 'sha384';
      break;
    case 'HS512':
      algorithm = 'sha512';
      break;
    default:
      throw new Error('Algorithm not supported');
  }

  const verify = crypto.createVerify(algorithm);
  const data = `${header}.${payload}`;
  verify.update(data);
  return verify.verify(key, signature, 'base64');
}
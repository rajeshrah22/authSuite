import crypto from 'crypto';

const createHash = (key, algorithm, data) => {
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

  const hash = crypto.createHmac(algorithm, key);
  hash.update(data);
  return hash.digest('base64');
};

export default createHash;
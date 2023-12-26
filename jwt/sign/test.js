import { sign } from './sign.js';
import { verify } from '../verify/verify.js';
import crypto from 'crypto';

const payload = {
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}

const secret = 'your-256-bit-secret';
const token = sign(payload, secret);

console.log(token);
console.log(verify(token, secret));

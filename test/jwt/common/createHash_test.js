import { expect } from 'chai';
import { describe } from 'mocha';

import createHash from '../../../jwt/common/createHash.js';

const KEY = 'your-256-bit-secret';
const HS256 = 'HS256';
const HS384 = 'HS384';
const HS512 = 'HS512';

describe('createHash', function() {
  it('should return a string', function() {
    const result = createHash(KEY, HS256, 'data');
    expect(result).to.be.a('string');
  });

  it('should return a different hash for different payloads', function() {
    const result1 = createHash(KEY, HS256, 'payload1');
    const result2 = createHash(KEY, HS256, 'payload2');
    expect(result1).to.not.equal(result2);
  });

  it('should return a different hash for different algorithms', function() {
    const result1 = createHash(KEY, HS256, 'payload');
    const result2 = createHash(KEY, HS512, 'payload');
    expect(result1).to.not.equal(result2);
  });

  it('should return the correct hash for sha512 algorithm', function() {
    const preHash = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"

    const result = createHash(KEY, HS256, preHash);
    expect(result).to.equal('SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  });
});
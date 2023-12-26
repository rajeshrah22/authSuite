import { expect } from 'chai';
import { sign } from '../../../src/jwt/sign.js';
import { describe } from 'mocha';

describe('sign', function() {
  it('should return a string', function() {
    const result = sign({data: 'payload'}, 'key');
    expect(result).to.be.a('string');
  });

  it('should return a different token for different payloads', function() {
    const result1 = sign({data: 'payload1'}, 'key');
    const result2 = sign({data: 'payload2'}, 'key');
    expect(result1).to.not.equal(result2);
  });

  it('should return a different token for different keys', function() {
    const result1 = sign({data: 'payload'}, 'key1');
    const result2 = sign({data: 'payload'}, 'key2');
    expect(result1).to.not.equal(result2);
  });
});
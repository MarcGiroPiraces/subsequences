import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { verifyJwtToken } from './verifyJwtToken';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('Given a verifyJwtToken function', () => {
  it('should verify a JWT token', () => {
    const mockToken = 'mock token';
    const mockDecodedToken = { exp: 12345 };

    (jwt.verify as jest.MockedFunction<typeof jwt.verify>).mockImplementation(() => mockDecodedToken);
    const decodedToken = verifyJwtToken(mockToken);

    expect(decodedToken).toBe(mockDecodedToken);
    expect(jwt.verify).toHaveBeenCalledWith(mockToken, SECRET_KEY);
  });

  it('should return null if token verification fails', () => {
    const mock = 'mock token';
    const mockError = new Error('mock error');

    (jwt.verify as jest.MockedFunction<typeof jwt.verify>).mockImplementation(() => {
      throw mockError;
    });
    const decodedToken = verifyJwtToken(mock);

    expect(decodedToken).toBeNull();
    expect(jwt.verify).toHaveBeenCalledWith(mock, SECRET_KEY);
  });
});

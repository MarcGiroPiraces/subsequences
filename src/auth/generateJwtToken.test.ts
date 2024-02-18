import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { generateJwtToken } from './generateJwtToken';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Given a generateJwtToken function', () => {
  it('should generate a JWT token with correct expiration', () => {
    const mockExpiration = Math.floor(Date.now() / 1000) + 600;
    const mockToken = 'mockedToken';

    (jwt.sign as jest.MockedFunction<typeof jwt.sign>).mockImplementation(() => mockToken);
    const token = generateJwtToken();

    expect(token).toBe(mockToken);
    expect(jwt.sign).toHaveBeenCalledWith(
      {
        exp: mockExpiration,
      },
      SECRET_KEY,
    );
  });
});

import { Request, Response } from 'express';
import { verifyJwtToken } from '../auth/verifyJwtToken';
import { auth } from './auth';

jest.mock('../auth/verifyJwtToken');

describe('Given an Auth Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = { header: jest.fn() };
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    next = jest.fn();
  });

  it('should return 401 if authorization header is missing', () => {
    auth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Access Denied');
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', () => {
    (req.header as jest.Mock).mockReturnValueOnce('Bearer invalidtoken');
    (verifyJwtToken as jest.Mock).mockReturnValueOnce(false);

    auth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Invalid Token');
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() if token is valid', () => {
    (req.header as jest.Mock).mockReturnValueOnce('Bearer validtoken');
    (verifyJwtToken as jest.Mock).mockReturnValueOnce(true);

    auth(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if token verification throws an error', () => {
    (req.header as jest.Mock).mockReturnValueOnce('Bearer invalidtoken');
    (verifyJwtToken as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Verification failed');
    });

    auth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Invalid Token');
    expect(next).not.toHaveBeenCalled();
  });
});

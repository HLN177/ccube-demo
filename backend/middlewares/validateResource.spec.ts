import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { validate } from "./validateResource";

const mockSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const mockRequest = (body: any): Partial<Request> => ({ body });
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext: NextFunction = jest.fn();

describe("validateResource Middleware", () => {
  it("should call next() if validation passes", () => {
    // Arrange
    const req = mockRequest({
      email: "test@example.com",
      password: "password123",
    });
    const res = mockResponse();
    const next = mockNext;

    // Act
    validate(mockSchema)(req as Request, res as Response, next);

    // Assert
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 400 if validation fails", () => {
    // Arrange
    const req = mockRequest({
      email: "invalid-email",
      password: "short",
    });
    const res = mockResponse();
    const next = mockNext;

    // Act
    validate(mockSchema)(req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 if body is missing", () => {
    // Arrange
    const req = mockRequest({});
    const res = mockResponse();
    const next = mockNext;

    // Act
    validate(mockSchema)(req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 400 if params is missing", () => {
    // Arrange
    const req = mockRequest({});
    const res = mockResponse();
    const next = mockNext;

    // Act
    validate(mockSchema)(req as Request, res as Response, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});

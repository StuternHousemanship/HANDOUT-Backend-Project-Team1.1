class AppError extends Error {
  public statusMessage: string;

  public statusCode: number;

  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusMessage = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;

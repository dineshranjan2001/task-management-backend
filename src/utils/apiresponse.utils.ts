export class ApiResponse<T> {
  private readonly _statusCode: number;
  private readonly _message: string;
  private readonly _data: T | undefined;
  private readonly _success: boolean;

  constructor(statusCode: number, message: string, data?: T) {
    this._statusCode = statusCode;
    this._message = message;
    this._data = data;
    this._success = statusCode >= 200 && statusCode < 300;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get message(): string {
    return this._message;
  }

  get data(): T | undefined {
    return this._data;
  }

  get success(): boolean {
    return this._success;
  }

  toJSON() {
    return {
      statusCode: this._statusCode,
      message: this._message,
      success: this._success,
      data: this._data,
    };
  }
}
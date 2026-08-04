export class ApiError<T> extends Error {
    private readonly _statusCode: number;
    private readonly _success: boolean;
    private readonly _errors: T | undefined;

    constructor(statusCode: number = 500, message: string = "Something went wrong", errors?: T, stack?: string) {
        super(message);
        this._statusCode = statusCode;
        this._success = false;
        this._errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }


    get statusCode(): number {
        return this._statusCode;
    }

    get success(): boolean {
        return this._success;
    }

    get errors(): T | undefined {
        return this._errors;
    }

    toJSON() {
        return {
            statusCode: this._statusCode,
            message: this.message,
            success: this._success,
            errors: this._errors,
        };
    }
}
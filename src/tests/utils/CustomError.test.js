const { CustomError, NotFoundError, BadRequestError, ExternalApiError } = require('../../utils/CustomError');

describe('CustomError Classes', () => {

    it('should create a CustomError with correct message and status code', () => {
        const error = new CustomError('Something went wrong', 400);

        expect(error.message).toBe('Something went wrong');
        expect(error.statusCode).toBe(400);
        expect(error instanceof CustomError).toBe(true);
        expect(error instanceof Error).toBe(true);
    });

    it('should create a NotFoundError with default message and 404 status', () => {
        const error = new NotFoundError();

        expect(error.message).toBe('Not Found');
        expect(error.statusCode).toBe(404);
        expect(error instanceof CustomError).toBe(true);
        expect(error instanceof NotFoundError).toBe(true);
        expect(error instanceof Error).toBe(true);
    });

    it('should create a NotFoundError with a custom message and 404 status', () => {
        const error = new NotFoundError('Custom not found message');

        expect(error.message).toBe('Custom not found message');
        expect(error.statusCode).toBe(404);
        expect(error instanceof CustomError).toBe(true);
        expect(error instanceof NotFoundError).toBe(true);
    });

    it('should create a BadRequestError with custom message and 400 status', () => {
        const error = new BadRequestError('Invalid input');

        expect(error.message).toBe('Invalid input');
        expect(error.statusCode).toBe(400);
        expect(error instanceof CustomError).toBe(true);
        expect(error instanceof BadRequestError).toBe(true);
        expect(error instanceof Error).toBe(true);
    });

    it('should create an ExternalApiError with default message and 503 status', () => {
        const error = new ExternalApiError();

        expect(error.message).toBe('External API Error');
        expect(error.statusCode).toBe(503);
        expect(error instanceof CustomError).toBe(true);
        expect(error instanceof ExternalApiError).toBe(true);
        expect(error instanceof Error).toBe(true);
    });

    it('should create an ExternalApiError with custom message and 503 status', () => {
        const error = new ExternalApiError('Custom API error message');

        expect(error.message).toBe('Custom API error message');
        expect(error.statusCode).toBe(503);
        expect(error instanceof CustomError).toBe(true);
        expect(error instanceof ExternalApiError).toBe(true);
    });
});

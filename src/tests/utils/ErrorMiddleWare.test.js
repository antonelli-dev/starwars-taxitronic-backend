const errorMiddleware = require('../../utils/ErrorMidleware');
const { CustomError, NotFoundError, BadRequestError, ExternalApiError } = require('../../utils/CustomError');

describe('Error Middleware', () => {
    let mockRes;
    let mockNext;

    beforeEach(() => {

        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    
    });

    it('should handle CustomError and return the appropriate status and message', () => {
        const customError = new CustomError('Custom error message', 400);

        errorMiddleware(customError, {}, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: 'Custom error message',
        });
    });

    it('should handle NotFoundError and return 404 status', () => {
        const notFoundError = new NotFoundError();

        errorMiddleware(notFoundError, {}, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: 'Not Found',
        });
    });

    it('should handle BadRequestError and return 400 status', () => {
        const badRequestError = new BadRequestError('Bad request error');

        errorMiddleware(badRequestError, {}, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: 'Bad request error',
        });
    });

    it('should handle ExternalApiError and return 503 status', () => {
        const externalApiError = new ExternalApiError();

        errorMiddleware(externalApiError, {}, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(503);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: 'External API Error',
        });
    });

    it('should handle unexpected errors and return 500 status', () => {
        const unexpectedError = new Error('Unexpected error');

        errorMiddleware(unexpectedError, {}, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: 'An unexpected error occurred',
        });
    });
});

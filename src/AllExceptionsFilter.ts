import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    // Method that catches exceptions and handles the response
    catch(exception: unknown, host: ArgumentsHost) {
        // Get the HTTP context (request and response objects)
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        // Determine the status code based on whether it's an HttpException or a generic error
        const status =
            exception instanceof HttpException
                ? exception.getStatus()  // Use the status from HttpException
                : HttpStatus.INTERNAL_SERVER_ERROR;  // Default to 500 if not an HttpException

        // Determine the error message
        const message =
            exception instanceof HttpException
                ? exception.getResponse()  // Use the response message from HttpException
                : 'Internal server error';  // Default message for non-HttpExceptions

        // Send a structured JSON response containing error details
        response.status(status).json({
            statusCode: status,  // The HTTP status code (e.g., 400, 404, 500)
            timestamp: new Date().toISOString(),  // Current timestamp in ISO format
            path: request.url,  // The URL where the error occurred
            message,  // The error message
        });
    }
}

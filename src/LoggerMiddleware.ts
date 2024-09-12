import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    // Middleware function that logs request details and response time
    use(req: Request, res: Response, next: NextFunction) {
        // Capture the start time of the request
        const start = Date.now();

        // When the response finishes, log the request method, URL, and duration
        res.on('finish', () => {
            const duration = Date.now() - start;
            console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
        });

        // Call the next middleware in the request cycle
        next();
    }
}

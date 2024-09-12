import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./AllExceptionsFilter";

async function bootstrap() {
    // Create the NestJS application instance
    const app = await NestFactory.create(AppModule);

    // Use global validation pipes to automatically validate incoming requests
    app.useGlobalPipes(
        new ValidationPipe({
            // Remove any properties from the incoming request that are not in the DTO (Data Transfer Object)
            whitelist: true,
            // Throw an error if the request contains properties that are not defined in the DTO
            forbidNonWhitelisted: true,
            // Automatically transform the incoming request data into the correct types (e.g., string to number)
            transform: true,
        }),
    );

    // Use a global exception filter to handle all uncaught exceptions
    app.useGlobalFilters(new AllExceptionsFilter());

    // Start the application and listen for incoming requests on port 3000
    await app.listen(3000);
}

// Call the bootstrap function to start the application
bootstrap();

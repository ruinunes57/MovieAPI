import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./AllExceptionsFilter";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

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

    const config = new DocumentBuilder()
        .setTitle('Movies API')
        .setDescription('API for managing movies and genres')
        .setVersion('1.0')
        .addTag('movies')
        .addTag('genders')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    // Use a global exception filter to handle all uncaught exceptions
    app.useGlobalFilters(new AllExceptionsFilter());

    // Start the application and listen for incoming requests on port 3000
    await app.listen(3000);
}

// Call the bootstrap function to start the application
bootstrap();

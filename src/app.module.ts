import {MiddlewareConsumer, Module, RequestMethod} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';
import {LoggerMiddleware} from "./LoggerMiddleware";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'movies.sqlite',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        GenresModule,
        MoviesModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}

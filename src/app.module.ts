import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MoviesModule } from './movies/movies.module';
import { GenresModule } from './genres/genres.module';

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
export class AppModule {}

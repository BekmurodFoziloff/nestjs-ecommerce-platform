import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get('MONGO_HOST');
        const port = configService.get('MONGO_PORT');
        const database = configService.get('MONGO_DATABASE');
        return {
          uri: `mongodb://${host}:${port}`,
          dbName: database,
          useNewUrlParser: true
        };
      }
    })
  ],
  controllers: [],
  providers: []
})
export class DatabaseModule {}

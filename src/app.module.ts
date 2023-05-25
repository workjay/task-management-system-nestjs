import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { TasksModule } from './modules/tasks/tasks.module';
config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

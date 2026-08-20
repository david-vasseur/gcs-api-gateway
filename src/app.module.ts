import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GcsModule } from './gcs/gcs.module';

@Module({
  imports: [GcsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

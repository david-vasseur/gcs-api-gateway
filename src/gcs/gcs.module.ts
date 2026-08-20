import { Module } from '@nestjs/common';
import { GcsService } from './gcs.service';
import { GcsController } from './gcs.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GcsProvider } from './gcs';

@Module({
  imports: [
    MulterModule.register({
      limits: { fileSize: 5 * 1024 * 1024 }, // Exemple: limite 5Mo
    }),
  ],
  controllers: [GcsController], // On ajoute le contrôleur
  providers: [GcsService, GcsProvider],
  exports: [GcsService],
})
export class GcsModule {}
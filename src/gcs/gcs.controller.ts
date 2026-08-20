import { Controller, Post, UseInterceptors, UploadedFiles, Body, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GcsService } from './gcs.service';
import { InternalApiKeyGuard } from '../guards/internal-api-key.guard';

@UseGuards(InternalApiKeyGuard) // Protection activée sur tout le contrôleur
@Controller('gcs')
export class GcsController {
  constructor(private readonly gcsService: GcsService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files')) // 'files' est le champ attendu dans le form-data
  async upload(@UploadedFiles() files: Express.Multer.File[], @Body('bucket') bucket: string) {
    return await this.gcsService.uploadMany(bucket, files);
  }
}
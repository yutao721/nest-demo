import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, Header } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { join } from 'path';
import { zip } from 'compressing'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  /**
   * 上传图片
   * @param file 
   * @returns 
   */
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file)
    return true
  }

  /**
   * 直接下载图片
   * @param res 
   * @returns 
   */
  @Get('export')
  download(@Res() res: Response) {
    const url = join(__dirname, '../../images/1681199969477.png');
    console.log(url)
    res.download(url)
    return true
  }

  /**
   * 通过流的方式下载
   * @param res 
   */
  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../../images/1681199969477.png');
    const tarStream = new zip.Stream()
    await tarStream.addEntry(url)
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=xiaoman.zip`,
    );
    tarStream.pipe(res)
  }

  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}

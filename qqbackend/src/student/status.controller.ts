import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusDto } from './dtos/status.dto';


@Controller()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('status/all')
  getAllStatuses() {
    return this.statusService.getAllStatus();
  }

  @Post('status')
  createStatus(@Body() statusDto: StatusDto) {
    return this.statusService.createStatus(statusDto);
  }

  @Put('status/update/:id')
  updateStatus(@Param('id') id: number, @Body() statusDto: StatusDto) {
    return this.statusService.updateStatus(id, statusDto);
  }

  @Delete('status/delete/:id')
  deleteStatus(@Param('id') id: number) {
    return this.statusService.deleteStatus(id);
  }
}
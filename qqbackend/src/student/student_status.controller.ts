import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StudentStatusService } from './student_status.service';
import { StatusDto } from './dtos/status.dto';


@Controller()
export class StudentStatusController {
  constructor(private readonly studentStatusService: StudentStatusService) {}

  @Get('status/all')
  getAllStatuses() {
    return this.studentStatusService.getAllStatus();
  }

  @Post('status')
  createStatus(@Body() statusDto: StatusDto) {
    return this.studentStatusService.createStatus(statusDto);
  }

  @Put('status/:id')
  updateStatus(@Param('id') id: number, @Body() statusDto: StatusDto) {
    return this.studentStatusService.updateStatus(id, statusDto);
  }

  @Delete('status/:id')
  deleteStatus(@Param('id') id: number) {
    return this.studentStatusService.deleteStatus(id);
  }
}
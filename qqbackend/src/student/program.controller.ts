import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProgramService } from "./program.service";
import { ProgramDto } from "./dtos/program.dto";


@Controller('program')
export class ProgramController {
    constructor(private readonly programService: ProgramService) {}

    @Get('all')
    getAllPrograms() {
        return this.programService.getAllPrograms();
    }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    createProgram(@Body() programDto: ProgramDto) {
        return this.programService.createProgram(programDto);
    }

    @Patch('update/:id')
    @UsePipes(new ValidationPipe({ transform: true}))
    updateProgram(@Param('id') id: number ,@Body() programDto: ProgramDto) {
        return this.programService.updateProgram(id, programDto);
    }

    @Delete('delete/:id')
    deleteProgram(@Param() id: number) {
        return this.programService.deleteProgram(id);
    }
}
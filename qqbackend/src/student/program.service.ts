import { Injectable } from "@nestjs/common";
import { ProgramDto } from "./dtos/program.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProgramEntity } from "./tables/program.entity";
import { Repository } from "typeorm";
import { StatusEntity } from "./tables/status.entity";

@Injectable()
export class ProgramService {

    constructor(
        @InjectRepository(ProgramEntity) private readonly programRepository: Repository<ProgramEntity>,
        @InjectRepository(StatusEntity) private readonly statusRepository: Repository<StatusEntity>

    ) {}
    
    async createProgram(dto: ProgramDto) {
        const status = await this.statusRepository.findOneBy({ id: 1 }); // Assuming id 1 is 'Valid'
        if (!status) {
            return "Status 'Valid' not found.";
        }

        const existingProgram = await this.programRepository.find({where: {name: dto.name}})
        if (existingProgram.length > 0) {
            return "Program with this name already exists.";
        } else {
            const programDto = this.programRepository.create(dto);
            programDto.status = status; // Safe assignment after null check

            await this.programRepository.save(programDto);
            return "Program created successfully.";
        }
    }

    getAllPrograms() {
        return this.programRepository.find({relations: ['status']});

    }

    updateProgram(id: number, programDto: ProgramDto) {
        throw new Error("Method not implemented.");
    }
    
    deleteProgram(id: number) {
        throw new Error("Method not implemented.");
    }
}
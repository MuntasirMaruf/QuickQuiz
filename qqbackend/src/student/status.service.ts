import { Injectable } from "@nestjs/common";
import { StatusDto } from "./dtos/status.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StatusEntity } from "./tables/status.entity";

@Injectable()
export class StatusService {

    constructor(@InjectRepository(StatusEntity) private readonly statusRepository: Repository<StatusEntity>){}

    async createStatus(statusDto: StatusDto): Promise<StatusEntity | string> {
        const existingStatus = await this.statusRepository.findOneBy({ name: statusDto.name });
        if (existingStatus) {
            return "Status with this name already exists.";
        } else {
            const statusEntity = this.statusRepository.create(statusDto);
            return this.statusRepository.save(statusEntity);
        }
      }

    async updateStatus(id: number, statusDto: StatusDto): Promise<StatusEntity | string | null> {
        const status = await this.statusRepository.findOneBy({id: id})
        // Get all the status without this name

        if(status){
            await this.statusRepository.update(id, statusDto);
            return this.statusRepository.findOneBy({ id: id });
        }
        return "Status not found.";
    }

    async getAllStatus(): Promise<StatusEntity[]> {
        return this.statusRepository.find({ relations: ['students'] });
    }

    async deleteStatus(id: number): Promise<void> {
        await this.statusRepository.delete(id);
    }
}
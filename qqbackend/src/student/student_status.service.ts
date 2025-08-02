import { Injectable } from "@nestjs/common";
import { StatusDto } from "./dtos/status.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StatusEntity } from "./tables/status.entity";

@Injectable()
export class StudentStatusService {

    constructor(@InjectRepository(StatusEntity) private readonly statusRepository: Repository<StatusEntity>){}

    async createStatus(stautsDto: StatusDto): Promise<StatusEntity> {
        return this.statusRepository.save(stautsDto);
    }

    async updateStatus(id: number, statusDto: StatusDto): Promise<StatusEntity | null> {
        const status = await this.statusRepository.findOneBy({id: id})
        if(status){
            await this.statusRepository.update(id, statusDto);
            return this.statusRepository.findOneBy({ id: id });
        }
        return null;
    }

    async getAllStatus(): Promise<StatusEntity[]> {
        return this.statusRepository.find();
    }

    async deleteStatus(id: number): Promise<void> {
        await this.statusRepository.delete(id);
    }
}
import { Injectable } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { adminData } from "./admin.dto";
@Injectable()
export class AdminService{
    getAdmin():string{
        return 'admin service is running!';
    }
    getAdminById(admin:number):string{
        return "admin id is "+ admin;
    }
      getAbdullahByNameAndId(name,id){
        return 'Name:' + name + ', id:' + id;
    }
    addAdmin(adminData:object){
        return adminData;
    }
    addAdmin2(adminData:adminData){
        console.log(adminData.username);
        return adminData;
    }
    addAdminDto(adminData:adminData){
        console.log(adminData.name);
        console.log(adminData.phone);
            return adminData;
    }

    getRegisteredData(admindata:adminData):object{
        console.log(admindata);
        return admindata;
    }
}
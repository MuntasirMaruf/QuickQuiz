import { Controller, Get,Post, Param,Query,Body } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { adminData } from "./admin.dto";

@Controller('admin')
export class AdminController{
    constructor(private readonly adminService: AdminService){}
    @Get()
    getAdmin(): string{
        return this.adminService.getAdmin();
    }
    @Get('id')
    getAdminById(@Param('id')admin:number){
      return this.adminService.getAdminById(admin);
    }
     @Get("/find")
   getAbdullahByNameAndId(@Query('name')name:string,@Query('id')id:number):string{
     return this.adminService.getAbdullahByNameAndId(name,id);
   }
    @Post('/addAdmin')
    addAdmin(@Body()adminData:object):object{
        return this.adminService.addAdmin(adminData);
    }
    @Post('/addAdmin2')
    addAdmin2(@Body()addAdminData2:adminData):object{
        return this.adminService.addAdmin2(addAdminData2);
    }
    //getadmin
    //remove admin
    //add student

    }

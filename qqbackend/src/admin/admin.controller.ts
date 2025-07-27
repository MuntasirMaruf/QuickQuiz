import { Controller, Get,Post, Param,Query,Body, UseInterceptors, UploadedFile, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { adminData } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";

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
    @Post('/register')
    @UsePipes(new ValidationPipe())
   @UseInterceptors(FileInterceptor('file',{
     
    fileFilter:(req,file,cb)=>{
      if(file.originalname.match(/^.*\.(pdf)$/))
        cb(null,true);
      else{
        cb(new MulterError('LIMIT_UNEXPECTED_FILE','image'),false);
      }
 
    },
    limits:{fileSize:5000000},
    storage: diskStorage({
      destination: './src/admin/Uploads',
      filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
      },
    })
 
   }))
 

  getRegisteredData(@UploadedFile() file: Express.Multer.File,@Body()admindata:adminData):object {
admindata.filename=file.filename;
 
  console.log(file);
 console.log(admindata);
 return this.adminService.getRegisteredData(admindata);


}
}



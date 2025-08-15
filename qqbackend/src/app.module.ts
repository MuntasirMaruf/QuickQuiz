import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.modlule';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [StudentModule,AdminModule,TypeOrmModule.forRoot(
 { type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'postgres',
 password: 'Sher@324678',
 database: 'project',//Change to your database name
 autoLoadEntities: true,
 synchronize: true,
 } ),
 ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

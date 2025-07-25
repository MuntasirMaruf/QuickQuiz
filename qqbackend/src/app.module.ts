import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.modlule';

@Module({
  imports: [StudentModule,AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

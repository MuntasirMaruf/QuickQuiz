import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.modlule';

@Module({
  imports: [StudentModule, AdminModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'al1aH',
      database: 'quickquiz_db',
      autoLoadEntities: true,
      synchronize: true,
    })],
  controllers: [],
  providers: [],
})
export class AppModule {}

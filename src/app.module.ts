import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfigModule } from './shared/infrastructure/env-config/env-config.module';
import { UsersModule } from './users/infrastructure/users.module';
import { DatabaseModule } from './shared/infrastructure/database/database.module';
import { PrismaService } from './shared/infrastructure/database/prisma/prisma.service';

@Module({
  imports: [EnvConfigModule, UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from 'prisma/prisma.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { CompaniesModule } from './modules/companies/companies.module';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  // ignoreEnvFile: true, // Ignore .env file since we're using Docker environment variables
  validationSchema: Joi.object({
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
  }),
});

@Module({
  imports: [AuthModule, UsersModule, CompaniesModule, JobsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

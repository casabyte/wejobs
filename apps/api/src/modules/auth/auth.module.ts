// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // ← @nestjs/jwt
import { PassportModule } from '@nestjs/passport'; // ← @nestjs/passport
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule, // registers passport with NestJS DI
    JwtModule.registerAsync({
      // async so we can inject ConfigService
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' }, // token lifespan
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy], // JwtStrategy must be a provider
  controllers: [AuthController],
  exports: [JwtModule], // export so other modules can use JwtService
})
export class AuthModule {}

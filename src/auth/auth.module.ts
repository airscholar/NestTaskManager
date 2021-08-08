import { JWTStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants';
import { AppConfigService } from 'src/config/config.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.JWT_SECRET,
      signOptions: { expiresIn: `${jwtConstants.JWT_EXP_TIME}s` }, // add this expiresIn value to the `jwtConstants` object
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AppConfigService, ConfigService, JWTStrategy],
  exports: [JWTStrategy, PassportModule],
})
export class AuthModule {}

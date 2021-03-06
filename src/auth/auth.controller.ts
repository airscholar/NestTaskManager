import { GetUser } from './auth.decorator';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO) {
    return await this.authService.signup(authCredentialsDTO);
  }
  @Post('/login')
  async signin(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO) {
    return await this.authService.signin(authCredentialsDTO);
  }
}

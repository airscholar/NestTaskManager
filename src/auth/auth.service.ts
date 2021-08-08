import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
    private appConfigService: AppConfigService,
  ) {}

  async signup(authCredentialsDTO: AuthCredentialsDTO) {
    return await this.userRepository.signup(authCredentialsDTO);
  }
  async signin(authCredentialsDTO: AuthCredentialsDTO) {
    const response = await this.userRepository.signin(authCredentialsDTO);

    if (!response) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }

    // const payload = response.username;
    const accessToken = await this.jwtService.sign({
      username: response.username,
    });

    return {
      message: 'User Logged In Successfully!',
      result: response,
      accessToken,
    };
  }
}

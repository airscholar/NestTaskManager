import { JwtPayload } from './interface/jwt-payload.interface';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(authCredentialsDTO: AuthCredentialsDTO) {
    return await this.userRepository.signup(authCredentialsDTO);
  }
  async signin(authCredentialsDTO: AuthCredentialsDTO) {
    const response = await this.userRepository.signin(authCredentialsDTO);

    if (!response) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }

    const payload: JwtPayload = { username: response.username };
    const accessToken = await this.jwtService.sign({ payload });

    return {
      message: 'User Logged In Successfully!',
      result: response,
      accessToken,
    };
  }
}

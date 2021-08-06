import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async signup(authCredentialsDTO: AuthCredentialsDTO) {
    return await this.userRepository.signup(authCredentialsDTO);
  }
  async signin(authCredentialsDTO: AuthCredentialsDTO) {
    return await this.userRepository.signin(authCredentialsDTO);
  }
}

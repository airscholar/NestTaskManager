import { AuthCredentialsDTO } from './../dto/auth-credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(authCredentialsDTO: AuthCredentialsDTO) {
    const { username, password } = authCredentialsDTO;

    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password);

    const exists = await User.findOne({ username });
    if (exists) {
      throw new ConflictException('Username already exists!');
    }

    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
    return { message: 'User created successfully!', result: user };
  }

  async signin(authCredentialsDTO: AuthCredentialsDTO) {
    console.log('TOKEN', process.env.JWT_TOKEN);
    return await this.checkUserPassword(authCredentialsDTO);
  }

  private async checkUserPassword(authCredentialsDTO: AuthCredentialsDTO) {
    const { username, password } = authCredentialsDTO;
    const user = await User.findOne({ username });
    if (user) {
      const isValid = await this.comparePassword(password, user.password);
      return isValid === true ? user : null;
    }
    return null;
  }

  private async comparePassword(password, userPassword) {
    return await bcrypt.compare(password, userPassword);
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}

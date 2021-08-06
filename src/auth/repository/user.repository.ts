import { AuthCredentialsDTO } from './../dto/auth-credentials.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(authCredentialsDTO: AuthCredentialsDTO) {
    const { username, password } = authCredentialsDTO;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

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
    const user = await this.checkUserPassword(authCredentialsDTO);

    if (user) {
      return { message: 'User Logged In Successfully!', result: user };
    } else {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }
  }

  private async checkUserPassword(authCredentialsDTO: AuthCredentialsDTO) {
    const { username, password } = authCredentialsDTO;
    const user = await User.findOne({ username });
    console.log(user);
    let dbSalt;
    if (user) {
      dbSalt = await this.hashPassword(password, user.salt);
      if (dbSalt === user.password) {
        return user;
      }
      return null;
    }
    return null;
  }
  private async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }
}

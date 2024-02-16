import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserService } from './user.service';
import { JWTPayload } from 'src/common/jwt.payload';
import { LoginDto } from '../dto/login.dto';
import { LoginResponseDto } from '../dto/loginResponse.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    // use to other
    // @InjectRepository(User)
    // private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return this.userService.findAll();
  }

  async login(request: LoginDto): Promise<LoginResponseDto> {
    const { username, password } = request;
    const valid = await this.validateUser(username, password);
    if (!valid) throw new UnauthorizedException('Not Valid Credentials');
    return await this.generateAccessToken(username);
  }

  private async validateUser(username: string, password: string) {
    const user = await this.userService.findByUserName(username);
    return await this.userService.validatePassword(password, user.password);
  }

  private async generateAccessToken(
    username: string,
  ): Promise<LoginResponseDto> {
    const user = await this.userService.findByUserName(username);
    const payload: JWTPayload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async getOlderDate(startDate: Date, days: number) {
    return new Date(startDate.setDate(startDate.getDate() - days));
  }
}

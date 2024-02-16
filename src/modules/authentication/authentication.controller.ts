import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './services/authentication.service';
import { CreateAuthenticationDto } from './dto/create-authentication.dto';
import { UpdateAuthenticationDto } from './dto/update-authentication.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}



  @Get('/users')
  // @UseGuards(AuthGuard('jwt'))
  findAll(@Headers() headers) {
    console.log(headers);
    return this.authenticationService.findAll();
  }

  
  @Post('login')
  login(@Body() request: LoginDto): Promise<LoginResponseDto> {
    return this.authenticationService.login(request);
  }
}

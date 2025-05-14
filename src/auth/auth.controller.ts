import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Sign Up a new user' })
  @ApiResponse({ status: 201, description: 'User has been created.' })
  @ApiResponse({ status: 400, description: 'User already exists.' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign In an existing user' })
  @ApiResponse({ status: 200, description: 'User logged in and JWT token returned.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Validate JWT token' })
  @ApiResponse({ status: 200, description: 'Token is valid.' })
  @ApiResponse({ status: 401, description: 'Invalid or expired token.' })
  async validateToken(@Request() req) {
    return { valid: true, user: req.user };
  }
}

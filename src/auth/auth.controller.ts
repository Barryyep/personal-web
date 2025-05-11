import { Controller, Post, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class SignUpDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;
}

class SignInDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async signUp(@Body() signUpDto: SignUpDto) {
    this.logger.log(`Signup attempt for email: ${signUpDto.email}`);
    const { data, error } = await this.authService.signUp(
      signUpDto.email,
      signUpDto.password,
    );

    if (error) {
      this.logger.error(`Signup failed for ${signUpDto.email}: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    this.logger.log(`User successfully registered: ${signUpDto.email}`);
    return data;
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in user' })
  @ApiResponse({ status: 200, description: 'User successfully signed in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signIn(@Body() signInDto: SignInDto) {
    this.logger.log(`Signin attempt for email: ${signInDto.email}`);
    const { data, error } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    if (error) {
      this.logger.error(`Signin failed for ${signInDto.email}: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }

    this.logger.log(`User successfully signed in: ${signInDto.email}`);
    return data;
  }

  @Post('signout')
  @ApiOperation({ summary: 'Sign out user' })
  @ApiResponse({ status: 200, description: 'User successfully signed out' })
  async signOut() {
    this.logger.log('Signout attempt');
    const { error } = await this.authService.signOut();
    
    if (error) {
      this.logger.error(`Signout failed: ${error.message}`);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    this.logger.log('User successfully signed out');
    return { message: 'Signed out successfully' };
  }
} 
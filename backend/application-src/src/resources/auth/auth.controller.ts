import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto, UpdateProfileDto } from './dto/auth.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  @ApiBody({
    description: 'Create new user payload',
    type: SignUpDto,
  })
  @ApiResponse({
    description: 'User account created successfully',
    status: 201,
  })
  @ApiResponse({
    description: 'Bad request',
    status: 400,
  })
  async signUp(@Body() payload: SignUpDto): Promise<any> {
    try {
      const user: User | null = await this.userService.findOneByEmail(
        payload.email,
      );

      // 1. Check if user exists with the provided email
      if (user) {
        // Throw a user exists error
      } else {
        // 2. Encrypt the user's password
        const encryptedPassword = payload.password;

        // 3. Create user account
        const res = await this.authService.createAccount({
          email: payload.email,
          password: encryptedPassword,
        });

        // 4. Generate a user JWT using id, email, role and token expiry time
        const jwt = 'user jwt';

        return {
          status: 201,
          message: 'User account created successfully',
          data: jwt,
        };
      }
    } catch (error) {
      return {
        status: 400,
        message: 'Bad request',
        error: error,
      };
    }
  }

  @Post('sign-in')
  @ApiBody({
    description: 'Log in user payload',
    type: SignUpDto,
  })
  @ApiResponse({
    description: 'User logged in successfully',
    status: 201,
  })
  @ApiResponse({
    description: 'Bad request',
    status: 400,
  })
  async signIn(@Body() payload: SignInDto): Promise<any> {
    try {
      const user: User | null = await this.userService.findOneByEmail(
        payload.email,
      );

      // 1. Check if the user with the provided email exists
      if (user) {
        // 2. Compare the provided user password with the salted hash
        const decryptedPassword = user.password;

        // 3. Check if the provided password is correct
        if (payload.password === decryptedPassword) {
          // 4. Update isLoggedIn state
          await this.authService.updateIsLoggedIn(user.id, {
            isLoggedIn: true,
          });

          // 5. Generate a user JWT using id, email, role and token expiry time
          const jwt = '';

          return {
            status: 201,
            message: 'User logged in successfully',
            data: jwt,
          };
        } else {
          // Throw a password invalid error
        }
      } else {
        // Throw a user not found error
      }
    } catch (error) {
      return {
        status: 400,
        message: 'Bad request',
        error: error,
      };
    }
  }

  @Patch('profile/:id')
  @ApiResponse({
    description: 'User profile updated successfully',
    status: 200,
  })
  @ApiResponse({
    description: 'Internal server error',
    status: 500,
  })
  async updateProfile(
    @Param('id') id: number,
    @Body() payload: UpdateProfileDto,
  ) {
    try {
      const res = await this.authService.updateProfile(id, payload);

      return {
        status: 200,
        message: 'User profile updated successfully',
        data: res.affected,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'Internal server error',
        error: error,
      };
    }
  }
}

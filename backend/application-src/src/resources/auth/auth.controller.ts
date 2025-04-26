import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto, UpdateProfileDto } from './dto/auth.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { hashPassword, isPasswordValid } from 'src/utils/common.util';

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
        /**
         * Throw a user exists error
         */
        throw new HttpException(
          {
            statusCode: HttpStatus.CONFLICT,
            message: `User with email address ${payload.email} already exists`,
            error: 'Conflict',
          },
          HttpStatus.CONFLICT,
          { cause: null },
        );
      } else {
        // 2. Hash the user's password
        const hashedPassword = await hashPassword(payload.password);

        // 3. Create user account
        const res = await this.authService.createAccount({
          email: payload.email,
          password: hashedPassword,
        });

        // 4. Generate a user JWT using id, email, role and logged in status
        const jwt = await this.authService.generateUserJWT({
          id: res.id,
          email: res.email,
          role: res.role,
          loggedIn: res.isLoggedIn,
        });

        return {
          statusCode: 201,
          message: 'User account created successfully',
          data: jwt,
        };
      }
    } catch (error) {
      throw error;
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
  @ApiResponse({
    description: 'Unauthorized',
    status: 401,
  })
  @ApiResponse({
    description: 'Not found',
    status: 404,
  })
  async signIn(@Body() payload: SignInDto): Promise<any> {
    try {
      const user: User | null = await this.userService.findOneByEmail(
        payload.email,
      );

      // 1. Check if the user with the provided email exists
      if (user) {
        const validUserPassword = await isPasswordValid(
          payload.password,
          user.password,
        );

        // 2. Check if the provided password is correct
        if (validUserPassword) {
          // 3. Update isLoggedIn state
          await this.authService.updateIsLoggedIn(user.id, {
            isLoggedIn: true,
          });

          // 4. Generate a user JWT using id, email, role and logged in status
          const jwt = await this.authService.generateUserJWT({
            id: user.id,
            email: user.email,
            role: user.role,
            loggedIn: user.isLoggedIn,
          });

          return {
            statusCode: 201,
            message: 'User logged in successfully',
            data: jwt,
          };
        } else {
          /**
           * Throw an invalid user password error
           */
          throw new HttpException(
            {
              statusCode: HttpStatus.UNAUTHORIZED,
              message: 'Invalid password',
              error: 'Unauthorized',
            },
            HttpStatus.UNAUTHORIZED,
            { cause: null },
          );
        }
      } else {
        /**
         * Throw user account not found error
         */
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: `User with email address ${payload.email} was not found`,
            error: 'Not found',
          },
          HttpStatus.NOT_FOUND,
          { cause: null },
        );
      }
    } catch (error) {
      throw error;
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

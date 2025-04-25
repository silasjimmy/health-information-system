import { Injectable } from '@nestjs/common';
import { SignUpDto, UpdateLoggedInDto, UpdateProfileDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { UpdateResult } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user account in the database
   * @param signUpDto user's information
   * @returns A resolved promise containing the newly created user details
   */
  createAccount(signUpDto: SignUpDto): Promise<SignUpDto & User> {
    return this.userService.create(signUpDto);
  }

  /**
   * Updates the user's logged in status in the database
   * @param userId user's ID
   * @param updateLoggedInDto login status to update to
   * @returns A resolved promise containing information of the number of rows updated
   */
  updateIsLoggedIn(
    userId: number,
    updateLoggedInDto: UpdateLoggedInDto,
  ): Promise<UpdateResult> {
    return this.userService.updateIsLoggedIn(userId, updateLoggedInDto);
  }

  /**
   * Updates the user's profile details in the database
   * @param userId user's ID
   * @param updateProfileDto user's information to update with
   * @returns A resolved promise containing information of the number of rows updated
   */
  updateProfile(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<UpdateResult> {
    return this.userService.updateProfile(id, updateProfileDto);
  }
}

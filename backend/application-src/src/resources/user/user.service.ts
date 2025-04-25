import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserLoggedInDto,
} from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user record in the database
   * @param createUserDto user's information
   * @returns A resolved promise containing the newly created user details
   */
  create(createUserDto: CreateUserDto): Promise<CreateUserDto & User> {
    return this.userRepository.save(createUserDto);
  }

  /**
   * Retrieves a single user record by ID from the database
   * @param id ID of the user to retrieve
   * @returns A resolved promise containing the retireved user details,
   * null if the user is not found
   */
  findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  /**
   * Retrieves a single user record by email address from the database
   * @param emailmail email of the user to retrieve
   * @returns A resolved promise containing the retireved user details,
   * null if the user is not found
   */
  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  /**
   * Updates a single user record in the database by ID
   * @param id user ID
   * @param updateUserDto user details to update with
   * @returns A resolved promise containing information of the number of rows updated
   */
  updateProfile(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  /**
   * Updates a user's logged in state in the database by ID
   * @param id user ID
   * @param updateUserLoggedIn user's login status
   * @returns A resolved promise containing information of the number of rows updated
   */
  updateIsLoggedIn(id: number, updateUserLoggedIn: UpdateUserLoggedInDto) {
    return this.userRepository.update(id, updateUserLoggedIn);
  }
}

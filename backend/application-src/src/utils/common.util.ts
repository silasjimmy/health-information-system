import * as bcrypt from 'bcrypt';

// User role types
export enum UserRole {
  DOCTOR = 'doctor',
  NURSE = 'nurse',
  ANONYMOUS = 'anonymous',
}

// Client gender types
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

// Success API result type
export interface SuccessResult {
  status: number;
  message: string;
  data: any;
}

// Error API result type
export interface ErrorResult {
  status: number;
  message: string;
  error: any;
}

/**
 * Hashes a user's password using the bcrypt library
 * @param password user's password to hash
 * @returns A resolved promise containing the hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  // Generate salt with 10 salt rounds
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
}

/**
 * Checks if the provided user password is valid
 * @param password user provided password
 * @param hash used hashed password in the database
 * @returns A resolved promise containing a boolean value of whether the password
 * is valid or not
 */
export function isPasswordValid(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

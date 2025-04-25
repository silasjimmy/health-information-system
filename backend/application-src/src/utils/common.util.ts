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
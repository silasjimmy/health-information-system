// Defines the types of gender
export enum Gender {
  MALE = "male",
  FEMALE = "female",
}

// Defines the properties and types of the add client form
export interface AddNewClientForm {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  age: number | null;
  gender: Gender | null;
  programs: Array<number>;
}

// Defines the properties and types of the add program form
export interface AddNewProgramForm {
  label: string | null;
  value: string | null;
  description: string | null;
}


// Defines the properties and types of the login form
export interface LoginForm {
  email: string | null;
  password: string | null;
}
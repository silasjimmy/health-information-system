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

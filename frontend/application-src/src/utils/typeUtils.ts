/**
 * Defines the API response structure
 */
export interface ActionResponse {
  success: boolean;
  code: string;
  message: string;
  data?: any;
}

/**
 * Defines the `EditProgramForm` component props
 */
export interface EditProgramFormProps {
  open: boolean;
  loading: boolean;
  program: any;
}

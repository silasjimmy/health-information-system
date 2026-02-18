/**
 * Defines the API response structure
 */
export interface ActionResponse {
  success: boolean;
  code: string;
  message: string;
  data?: any;
}

/**
 * Defines commonly used variables across the application.
 * This file serves as a central location for storing constants and URIs that are used in multiple places.
 * By defining these variables here, we can easily manage and update them without having to search through the entire codebase.
 * This promotes better maintainability and reduces the risk of errors when changes are needed.
 */

// Base API endpoint for all HTTP requests
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

// User profile endpoint URI
export const userProfileURI = `${apiEndpoint}/auth/profile`;

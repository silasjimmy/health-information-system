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

// Get clients endpoint URI
export const getClientsURI = `${apiEndpoint}/clients/all`;

// Add client endpoint URI
export const addClientURI = `${apiEndpoint}/clients/client`;

// Get client endpoint URI
export const getClientByURI = `${apiEndpoint}/clients/client`;

// Get programs endpoint URI
export const getProgramsURI = `${apiEndpoint}/programs/all`;

// Add program endpoint URI
export const addProgramURI = `${apiEndpoint}/programs/program`;
// BaitulMamur-Frontend/utils/fetchWithAuth.ts
export async function fetchWithAuth(url: string, options?: RequestInit) {
  const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage

  const headers = {
    ...options?.headers,
    'Content-Type': 'application/json', // Default to JSON, can be overridden
  };

  if (token) {
    headers['x-auth-token'] = token; // Add the token to the header
  }

  const response = await fetch(url, { ...options, headers });

  // Handle unauthorized responses globally if needed
  if (response.status === 401) {
    // Optionally redirect to login page or clear token
    console.log('Unauthorized request. Redirecting to login or refreshing token.');
    // Example: window.location.href = '/login';
  }

  return response;
}

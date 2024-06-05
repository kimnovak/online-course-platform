export const apiClient = (
  input: string | URL | Request,
  init: RequestInit | undefined = {}
) => {
  const token = localStorage.getItem('authToken');
  return fetch(input, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers || {}),
    },
    ...init,
  });
};

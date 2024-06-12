type LoginRequestBody = {
  username: string;
  password: string;
};

export const login = (data: LoginRequestBody) =>
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

type RegisterRequestBody = {
  username: string;
  password: string;
};

export const register = (data: RegisterRequestBody) =>
  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

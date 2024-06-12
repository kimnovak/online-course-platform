import { apiClient } from './client';

export const getCurrentUser = () => apiClient('/api/me');

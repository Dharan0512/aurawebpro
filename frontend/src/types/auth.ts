export interface User {
  id: string;
  email: string;
  role: string;
  profileId?: string;
  subscriptionPlan?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password?: string; // or specific fields for your login
}

export interface RegisterCredentials {
  email: string;
  password?: string;
  role?: string;
}

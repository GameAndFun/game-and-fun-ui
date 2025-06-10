export interface AuthState {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiry: number;
}

export interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthSuccessData {
  refresh_token: string;
  access_token: string;
}

export interface AuthResult {
  success: boolean;
  error: string | null;
}

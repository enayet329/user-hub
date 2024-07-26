
export interface User {
  name: string;
  email: string;
  lastLoginTime: string;
  isBlocked: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  token?: string;
  data?: T;
}


export interface JwtPayload {
  sub: string;
  name: string;
  email: string;
  isBlocked: boolean;
  jti: string;
  iat: number;
}

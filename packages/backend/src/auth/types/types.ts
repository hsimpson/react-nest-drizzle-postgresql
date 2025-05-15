export type AuthJwtPayload = {
  sub: string;
  email: string;
};

export type JwtTokens = {
  accessToken: string;
  refreshToken: string;
};

export type ExpressRequestUser = {
  accountId: string;
};

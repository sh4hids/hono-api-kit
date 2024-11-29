import { getCookie, setCookie } from 'hono/cookie';
import { sign, verify } from 'hono/jwt';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import db from '@/db';
import env from '@/env';
import { AppRouteHandler } from '@/lib/types';
import { comparePassword } from '@/lib/utils';

import { LoginRoute, RefereshAccessTokenRoute } from './auth.routes';

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const { email, password } = c.req.valid('json');
  const user = await db.query.users.findFirst({
    where(fields, operators) {
      return operators.eq(fields.email, email);
    },
  });

  if (!user) {
    return c.json(
      {
        message: ReasonPhrases.UNAUTHORIZED,
      },
      StatusCodes.UNAUTHORIZED
    );
  }

  const isValidPassword = await comparePassword(password, user.password);

  if (!isValidPassword) {
    return c.json(
      {
        message: 'Invalid email or password',
      },
      StatusCodes.UNAUTHORIZED
    );
  }

  const accessToken = await sign(
    { email, exp: Math.floor(Date.now() / 1000) + 60 * 15 },
    env.JWT_ACCESS_TOKEN_SECRET
  );
  const refreshToken = await sign({ email }, env.JWT_REFRESH_TOKEN_SECRET);

  const { password: _password, ...userData } = user;

  setCookie(c, 'refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
    maxAge: 24 * 60,
  });

  return c.json({ user: userData, accessToken }, StatusCodes.OK);
};

export const refereshAccessTokenRoute: AppRouteHandler<
  RefereshAccessTokenRoute
> = async (c) => {
  const refreshToken = getCookie(c, 'refreshToken');
  const validatedRefreshToken = await verify(
    refreshToken || '',
    env.JWT_REFRESH_TOKEN_SECRET
  );

  if (!refreshToken || !validatedRefreshToken) {
    return c.json(
      {
        message: 'Invalid refresh token',
      },
      StatusCodes.UNAUTHORIZED
    );
  }

  const accessToken = await sign(
    {
      email: validatedRefreshToken.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
    },
    env.JWT_ACCESS_TOKEN_SECRET
  );

  return c.json({ accessToken }, StatusCodes.OK);
};

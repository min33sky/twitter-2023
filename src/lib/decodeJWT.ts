import { JWT, decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * NextAuth에서 제공하는 JWT 토큰을 디코딩한다.
 *
 * @returns JWT | null
 */
export default async function decodeJWT() {
  const nextCookies = cookies();

  const cookie = nextCookies.getAll().find((cur) => {
    return cur.name === 'next-auth.session-token';
  })?.value;

  console.log('### getJwtSession - cookie : ', cookie);

  if (!cookie) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const session: JWT | null = await decode({
    token: cookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  console.log('### getJwtSession - decoded 토큰 : ', session);

  return session;
}

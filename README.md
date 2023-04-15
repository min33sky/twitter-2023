# Twitter 2023

> Twitter 2023 is a Twitter clone built with Next.js

## Stacks'

- Next.js@`13.3.1`
- TypeScript
- Tailwind CSS

## Note

1. next@`13.3.0`에서 'use client' 쓰면 에러남 (https://github.com/vercel/next.js/issues/48070)

2. `errno: -4078, code: 'ECONNREFUSED'` 에러 해결법

- http://localhost:3000 대신 http://127.0.0.1:3000 으로 요청을 보내면 해결
- [참고](https://stackoverflow.com/questions/75115516/connection-refused-from-nextjs-api-incremental-static-regeneration-calls)

3. 이미지를 base64로 인코딩해서 DB에 저장하는 방법을 써봤는데 개비추 (개느림 , 서버에도 안좋음)

4. `getServerSession` 이거 vercel에 배포하면 왜 작동 안하냐........... 임시 해결책

```ts
import { JWT, decode } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  const nextCookies = cookies();

  const cookie = nextCookies.getAll().reduce((acc, cur) => {
    if (cur.name === 'next-auth.session-token') {
      return acc + cur.value;
    }
    return acc;
  }, '');

  const session: JWT | null = await decode({
    token: cookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  if (!session) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 401,
      },
    );
  }
}
```

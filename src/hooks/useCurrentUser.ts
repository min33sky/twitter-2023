import { User } from '@prisma/client';
import useSWR from 'swr';

export default function useCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR<User>(
    '/api/current',
    () =>
      fetch('/api/current').then((res) => {
        if (!res.ok) {
          return null;
        }
        return res.json();
      }),
    {
      // https://swr.vercel.app/ko/docs/error-handling
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // 404에서 재시도 안함
        if (error.status === 404) return;

        // 3번까지만 재시도함
        if (retryCount >= 3) return;

        // 5초 후에 재시도
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    },
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}

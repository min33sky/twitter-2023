import { UserDetail } from '@/app/types';
import useSWR from 'swr';

export default function useUser(userId: string) {
  const { data, isLoading, error, mutate } = useSWR<UserDetail | null>(
    `/api/users/${userId}`,
    () =>
      userId ? fetch(`/api/users/${userId}`).then((res) => res.json()) : null,
  );

  return {
    user: data,
    isLoading,
    error,
    mutate,
  };
}

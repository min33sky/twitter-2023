import { User } from '@prisma/client';
import useSWR from 'swr';

export default function useUsers() {
  const { data, isLoading, error, mutate } = useSWR<User[]>('/api/users', () =>
    fetch('/api/users').then((res) => res.json()),
  );

  return {
    users: data,
    isLoading,
    error,
    mutate,
  };
}

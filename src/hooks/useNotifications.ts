import type { Notification } from '@prisma/client';
import useSWR from 'swr';

export default function useNotifications(userId?: string) {
  const url = userId ? `/api/notifications/${userId}` : '';

  const { data, error, isLoading, mutate } = useSWR<Notification[]>(url, () =>
    fetch(url).then((res) => res.json()),
  );

  console.log('시ㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣㅣ발: ', data);

  return {
    notifications: data,
    isLoading,
    error,
    mutate,
  };
}

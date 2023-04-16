import useSWR from 'swr';

export default function usePosts(userId?: string) {
  const url = userId ? `/api/posts?userId=${userId}` : '/api/posts';

  const { data, error, isLoading, mutate } = useSWR('/api/posts', () =>
    fetch(url).then((res) => res.json()),
  );

  return {
    posts: data,
    error,
    isLoading,
    mutate,
  };
}

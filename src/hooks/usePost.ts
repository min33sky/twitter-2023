import { PostDetail } from '@/app/types';
import useSWR from 'swr';

export default function usePost(postId?: string) {
  const url = postId ? `/api/posts/${postId}` : '';

  const { data, error, isLoading, mutate } = useSWR<PostDetail>(
    `/api/posts/${postId}`,
    () => fetch(url).then((res) => res.json()),
  );

  return {
    post: data,
    error,
    isLoading,
    mutate,
  };
}

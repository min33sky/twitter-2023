import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import useCurrentUser from './useCurrentUser';
import usePost from './usePost';
import usePosts from './usePosts';
import useLoginModal from './useLoginModal';

interface Props {
  postId: string;
  userId: string;
}

export default function useLike({ postId, userId }: Props) {
  const { data: currentUser } = useCurrentUser();
  const { post: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const loginModal = useLoginModal();

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likeIds || [];

    return list.includes(currentUser?.id!);
  }, [fetchedPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasLiked) {
        request = () =>
          fetch(`/api/like`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId }),
          });
      } else {
        request = () =>
          fetch(`/api/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId }),
          });
      }

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [
    currentUser,
    hasLiked,
    postId,
    mutateFetchedPosts,
    mutateFetchedPost,
    loginModal,
  ]);

  return {
    hasLiked,
    toggleLike,
  };
}

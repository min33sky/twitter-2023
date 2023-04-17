import useCurrentUser from './useCurrentUser';
import useUser from './useUser';
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';
import useLoginModal from './useLoginModal';

export default function useFollow(userId: string) {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      console.log('##### 팔로우 ID: ', userId);

      if (isFollowing) {
        request = () =>
          fetch(`/api/follow?userId=${userId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          });
      } else {
        request = () =>
          fetch(`/api/follow`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
          });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [
    currentUser,
    loginModal,
    isFollowing,
    mutateCurrentUser,
    mutateFetchedUser,
    userId,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
}

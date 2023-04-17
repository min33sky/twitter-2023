'use client';

import useCurrentUser from '@/hooks/useCurrentUser';
import useLoginModal from '@/hooks/useLoginModal';
import usePosts from '@/hooks/usePosts';
import useRegisterModal from '@/hooks/useRegisterModal';
import React, { useCallback, useState } from 'react';
import Avatar from './Avatar';
import Button from './Button';

interface Props {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

export default function Form({
  placeholder,
  isComment = false,
  postId,
}: Props) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: muatePosts } = usePosts();
  // TODO: usePost

  console.log('### currentUser : ', currentUser);

  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('### body : ', body);

      // try {
      //   setIsLoading(true);

      //   const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

      //   await axios.post(url, { body });

      //   toast.success('Tweet created');
      //   setBody('');
      //   mutatePosts();
      //   mutatePost();
      // } catch (error) {
      //   toast.error('Something went wrong');
      // } finally {
      //   setIsLoading(false);
      // }
    },
    [body],
  );

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                peer
                mt-3
                w-full
                resize-none
                bg-black
                text-[20px]
                text-white
                placeholder-neutral-500
                outline-none
                ring-0
                disabled:opacity-80
              "
              placeholder={placeholder}
            ></textarea>
            <hr
              className="
                h-[1px]
                w-full
                border-neutral-800
                opacity-0
                transition
                peer-focus:opacity-100"
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body} label="Tweet" />
            </div>
          </form>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="mb-4 text-center text-2xl font-bold text-white">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import usePosts from '@/hooks/usePosts';
import PostItem from './PostItem';

interface Props {
  userId?: string;
}

export default function PostFeed({ userId }: Props) {
  const { posts } = usePosts(userId);

  console.log('### posts : ', posts);

  return (
    <>
      {posts?.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </>
  );
}

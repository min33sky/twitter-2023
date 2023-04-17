'use client';

import Form from '@/components/Form';
import Header from '@/components/Header';
import PostItem from '@/components/posts/PostItem';
import usePost from '@/hooks/usePost';
import React from 'react';
import { ClipLoader } from 'react-spinners';

interface Props {
  params: {
    postId: string;
  };
}

export default function PostDetail({ params: { postId } }: Props) {
  const { post: fetchedPost, isLoading } = usePost(postId);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex h-full items-center justify-center">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <>
      <Header showBackArrow label="Tweet" />
      <PostItem post={fetchedPost} />
      <Form postId={postId} isComment placeholder="Tweet your reply" />
      {/* CommentFeed */}
    </>
  );
}

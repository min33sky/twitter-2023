import type { CommentDetail } from '@/app/types';
import React from 'react';
import CommentItem from './CommentItem';

interface Props {
  comments: CommentDetail[];
}

export default function CommentFeed({ comments }: Props) {
  return (
    <>
      {comments.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </>
  );
}

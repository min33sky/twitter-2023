import { User, Comment, Post, User } from '@prisma/client';

type UserDetail = User & {
  followersCount: number;
};

type PostDetail = Post & {
  user: User;
  comments: Comment[];
};

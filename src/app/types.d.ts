import { User } from '@prisma/client';

type UserDetail = User & {
  followersCount: number;
};

import prisma from '../models/prisma';

export const createPost = async (authorId: string, data: any) => {
  return await prisma.post.create({
    data: {
      authorId,
      content: data.content,
      mediaUrls: data.mediaUrls || [],
      tags: data.tags || []
    }
  });
};

export const getFeed = async (limit: number = 20, cursor?: string) => {
  return await prisma.post.findMany({
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          id: true,
          role: true,
          profile: {
            select: { firstName: true, lastName: true, avatarUrl: true }
          }
        }
      },
      _count: { select: { likes: true, comments: true } }
    }
  });
};

export const likePost = async (userId: string, postId: string) => {
  return await prisma.like.create({
    data: { userId, postId }
  });
};

export const unlikePost = async (userId: string, postId: string) => {
  return await prisma.like.delete({
    where: {
      postId_userId: { postId, userId }
    }
  });
};

export const addComment = async (authorId: string, postId: string, content: string) => {
  return await prisma.comment.create({
    data: { authorId, postId, content }
  });
};

export const getTrendingPosts = async () => {
  // Simple algorithm: posts with most likes in the last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return await prisma.post.findMany({
    where: { createdAt: { gte: sevenDaysAgo } },
    orderBy: { likes: { _count: 'desc' } },
    take: 5,
    include: {
      author: { select: { profile: { select: { firstName: true, lastName: true } } } }
    }
  });
};

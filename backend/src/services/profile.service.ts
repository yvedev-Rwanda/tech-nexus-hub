import prisma from '../models/prisma';

export const getProfile = async (userId: string) => {
  return await prisma.profile.findUnique({
    where: { userId },
    include: {
      user: { select: { email: true, role: true } },
      _count: { select: { followers: true, following: true } }
    }
  });
};

export const updateProfile = async (userId: string, data: any) => {
  return await prisma.profile.update({
    where: { userId },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      skills: data.skills,
      projectHistory: data.projectHistory,
      certifications: data.certifications,
      visibility: data.visibility
    }
  });
};

export const followUser = async (followerId: string, followingId: string) => {
  // Check if trying to follow self
  if (followerId === followingId) throw new Error("You cannot follow yourself");

  return await prisma.follow.create({
    data: {
      followerId,
      followingId
    }
  });
};

export const unfollowUser = async (followerId: string, followingId: string) => {
  return await prisma.follow.delete({
    where: {
      followerId_followingId: { followerId, followingId }
    }
  });
};

export const getRecommendations = async (userId: string) => {
  // Logic to recommend users based on skills or common connections
  // For now, return recent users who are not the current user
  return await prisma.profile.findMany({
    where: { userId: { not: userId } },
    take: 5,
    include: { user: { select: { role: true } } }
  });
};

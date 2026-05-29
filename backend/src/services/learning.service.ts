import prisma from '../models/prisma';

export const getAllPaths = async () => {
  return await prisma.learningPath.findMany({
    include: { _count: { select: { sections: true } } }
  });
};

export const getPathDetails = async (pathId: string) => {
  return await prisma.learningPath.findUnique({
    where: { id: pathId },
    include: { sections: { orderBy: { order: 'asc' } } }
  });
};

export const createPath = async (data: any) => {
  return await prisma.learningPath.create({
    data: {
      title: data.title,
      description: data.description,
      thumbnailUrl: data.thumbnailUrl,
      tags: data.tags || [],
      sections: {
        create: data.sections.map((s: any, index: number) => ({
          title: s.title,
          content: s.content,
          order: index
        }))
      }
    }
  });
};
// Add more (progress tracking) later

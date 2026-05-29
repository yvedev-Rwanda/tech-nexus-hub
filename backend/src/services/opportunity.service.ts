import prisma from '../models/prisma';

export const getOpportunities = async (filters: any) => {
  return await prisma.opportunity.findMany({
    where: {
      type: filters.type,
      location: filters.location ? { contains: filters.location, mode: 'insensitive' } : undefined,
    },
    include: { company: { select: { name: true, logoUrl: true } } },
    orderBy: { createdAt: 'desc' }
  });
};

export const createOpportunity = async (companyId: string, data: any) => {
  return await prisma.opportunity.create({
    data: {
      companyId,
      title: data.title,
      type: data.type,
      description: data.description,
      requirements: data.requirements || [],
      location: data.location,
      salary: data.salary
    }
  });
};

export const applyToOpportunity = async (userId: string, opportunityId: string, data: any) => {
  return await prisma.application.create({
    data: {
      userId,
      opportunityId,
      resumeUrl: data.resumeUrl
    }
  });
};

export const getCompanyApps = async (companyId: string) => {
  return await prisma.application.findMany({
    where: { opportunity: { companyId } },
    include: { 
      user: { include: { profile: true } },
      opportunity: { select: { title: true } }
    }
  });
};

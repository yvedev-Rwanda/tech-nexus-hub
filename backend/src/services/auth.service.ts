import prisma from '../models/prisma';
import { hashPassword, comparePassword, generateToken } from '../utils/auth.utils';
import { RegisterDTO, LoginDTO } from '../types/auth.types';

export const registerUser = async (data: RegisterDTO) => {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: data.role || 'LEARNER',
      profile: {
        create: {
          firstName: data.firstName,
          lastName: data.lastName,
        }
      }
    },
    include: { profile: true }
  });

  const token = generateToken({ id: user.id, role: user.role });
  return { user, token };
};

export const loginUser = async (data: LoginDTO) => {
  const user = await prisma.user.findUnique({ 
    where: { email: data.email },
    include: { profile: true }
  });
  
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(data.password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken({ id: user.id, role: user.role });
  return { user, token };
};

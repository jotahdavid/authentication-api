import { User } from '@prisma/client';

import prisma from '@services/prisma';

type NewUser = Omit<User, 'id'>;
type UpdateUser = Pick<User, 'email' | 'name'>;
type UpdateUserPassword = Pick<User, 'password'>;

class UserRepository {
  findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  create(newUser: NewUser) {
    return prisma.user.create({
      data: newUser,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async update(id: string, updatedUser: UpdateUser) {
    return prisma.user.update({
      where: {
        id,
      },
      data: updatedUser,
    });
  }

  async updatePassword(id: string, updatedUserPassword: UpdateUserPassword) {
    return prisma.user.update({
      where: {
        id,
      },
      data: updatedUserPassword,
    });
  }
}

export default new UserRepository();

import prisma from '@/lib/prisma';
import { PhysioRepository } from '../domain/PhysioRepository';
import { Physio } from '../domain/Physio';

export const prismaPhysioRepository: PhysioRepository = {
  create: async (name: string): Promise<Physio> => {
    const physioCreated = await prisma.physio.create({
      data: { name }
    });

    return {
      id: physioCreated.id,
      name: physioCreated.name
    };
  },

  findById: async (id: string): Promise<Physio | null> => {
    const physio = await prisma.physio.findUnique({
      where: { id }
    });

    if (!physio) return null;

    return {
      id: physio.id,
      name: physio.name
    };
  },

  findAll: async (): Promise<Physio[]> => {
    const physios = await prisma.physio.findMany();

    return physios.map(physio => ({
      id: physio.id,
      name: physio.name
    }));
  },

  update: async (id: string, name: string): Promise<Physio> => {
    const physioUpdated = await prisma.physio.update({
      where: { id },
      data: { name }
    });

    return {
      id: physioUpdated.id,
      name: physioUpdated.name
    };
  },

  delete: async (id: string): Promise<void> => {
    await prisma.physio.delete({
      where: { id }
    });
  }
};

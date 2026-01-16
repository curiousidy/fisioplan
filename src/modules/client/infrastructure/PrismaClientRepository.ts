import prisma from "@/lib/prisma";
import { Client } from "../domain/Client";
import { ClientRepository } from "../domain/ClientRepository";

export const prismaClientRepository: ClientRepository = {
    create: async (client: Omit<Client, "id">): Promise<Client> => {
        const clientCreated = await prisma.client.create({
            data: {
                name: client.name,
                phone: client.contact
            }
        });

        return {
            id: clientCreated.id,
            name: clientCreated.name,
            contact: clientCreated.phone
        };
    },

    findById: async (id: string): Promise<Client | null> => {
        const client = await prisma.client.findUnique({
            where: { id }
        });

        if (!client) return null;

        return {
            id: client.id,
            name: client.name,
            contact: client.phone
        };
    },

    findAll: async (): Promise<Client[]> => {
        const client = await prisma.client.findMany();

        return client.map(client => ({
            id: client.id,
            name: client.name,
            contact: client.phone
        }))
    },

    update: async (client: Client): Promise<Client> => {
        const clientUpdated = await prisma.client.update({
            where: { id: client.id },
            data: {
                id:client.id,
                name: client.name,
                phone:client.contact
            }
        });

        return client;
    },

    delete: async (id: string): Promise<void> => {
        await prisma.client.delete({
            where: { id }
        });
    }
}
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
        throw new Error("Not implemented yet");
    },

    findAll: async (): Promise<Client[]> => {
        throw new Error("Not implemented yet");
    },

    update: async (id: string, name: string): Promise<Client> => {
        throw new Error("Not implemented yet");
    },

    delete: async (id: string): Promise<void> => {
        throw new Error("Not implemented yet");
    }
}
import { Client, validateClientName, validateContact } from "../../domain/Client";
import { ClientRepository } from "../../domain/ClientRepository";

export const createClientUseCase = async (client :  Omit<Client, "id"> , clientRepository: ClientRepository) : Promise<Client> => {
    validateClientName(client.name);
    validateContact(client.contact);
    return await clientRepository.create(client);
}
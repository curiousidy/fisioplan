import { Client, validateClientName, validateContact } from "../../domain/Client";
import { ClientRepository } from "../../domain/ClientRepository";

export const createClientUseCase = async (client :  Omit<Client, "id"> , clientRepository: ClientRepository) : Promise<Client> => {
    validateClientName(client.name);
    validateContact(client.contact);

    const existingClient = await clientRepository.findByNameAndContact(client.name, client.contact);
    if (existingClient) {
        throw new Error('Ya existe un cliente con ese nombre y contacto');
    }

    return await clientRepository.create(client);
}
import { Client, validateClientId } from "../../domain/Client";
import { ClientRepository } from "../../domain/ClientRepository";

export const deleteClientUseCase = async (client: Client, clientRepository: ClientRepository) : Promise<Client | null > => {
    validateClientId(client.id);
    const clientDeleted = await clientRepository.findById(client.id);
    await clientRepository.delete(client.id);
    return clientDeleted;
}
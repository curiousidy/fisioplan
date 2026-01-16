import { Client, validateClient } from "../../domain/Client";
import { ClientRepository } from "../../domain/ClientRepository";

export const updateClientUseCase = async (client: Partial<Client>, clientRepository: ClientRepository): Promise<Client> => {
    if(client.id){
        let clientToUpdate = await clientRepository.findById(client.id)
        validateClient(clientToUpdate);
        if(clientToUpdate){
            clientToUpdate = {
                id: client.id,
                name: client.name ?? clientToUpdate.name,
                contact: client.contact ?? clientToUpdate.contact
            }

            return await clientRepository.update (clientToUpdate);
        }
    }
    return ({
        id: client.id ?? '',
        name: client.name ?? '',
        contact: client.contact ?? ''
    })
}
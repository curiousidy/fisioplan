import { Client } from "../../domain/Client";
import { ClientRepository } from "../../domain/ClientRepository";

export const findAllUseCase = async (clientRepository: ClientRepository) : Promise<Client[]> =>  {
    return await clientRepository.findAll();
}
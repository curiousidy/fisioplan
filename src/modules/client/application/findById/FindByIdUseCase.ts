import { Client, validateClientId } from "../../domain/Client";
import { ClientRepository } from "../../domain/ClientRepository";

export const findByIdUseCase = async (id:string, clientRepository: ClientRepository) : Promise<Client | null >  => {
    validateClientId(id);
    return await clientRepository.findById(id);
}
import { Client } from "../domain/Client";
import { UpdateRequestDTO } from "./updateRequestDTO";

export const fromUpdateRequestDTOtoClient = (client: UpdateRequestDTO) : Partial<Client> => ({
    name:client.name,
    contact: client.contact,
})
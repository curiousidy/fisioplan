import { Client } from "./Client";


export interface ClientRepository {
    create(client :  Omit<Client, "id">): Promise<Client>;
    findById(id: string): Promise<Client | null>;
    findByNameAndContact(name: string, contact: string): Promise<Client | null>;
    findAll(): Promise<Client[]>;
    update(data: Client): Promise<Client>;
    delete(id: string): Promise<void>;
}
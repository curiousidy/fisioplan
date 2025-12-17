import { Client } from "./Client";


export interface ClientRepository {
    create(client :  Omit<Client, "id">): Promise<Client>;
    findById(id: string): Promise<Client | null>;
    findAll(): Promise<Client[]>;
    update(id: string, name: string): Promise<Client>;
    delete(id: string): Promise<void>;
}
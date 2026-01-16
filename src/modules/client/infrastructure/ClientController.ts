import { NextResponse } from "next/server";
import { ClientRepository } from "../domain/ClientRepository";
import { createClientUseCase } from "../application/create/CreateClientUseCase";
import { findAllUseCase } from "../application/findAll/FindAllUseCase";
import { findByIdUseCase } from "../application/findById/FindByIdUseCase";
import { Client } from "../domain/Client";
import { deleteClientUseCase } from "../application/delete/DeleteClientUseCase";
import { updateClientUseCase } from "../application/update/UpdateUseCase";
import { UpdateRequestDTO } from "./updateRequestDTO";
import { fromUpdateRequestDTOtoClient } from "./mapper";

export interface ClientController {
    create(request: Request): Promise<NextResponse>;
    findAll(): Promise<NextResponse>;
    findById(id: string): Promise<NextResponse>;
    delete(id: string): Promise<NextResponse>;
    update(id: string, request: Request): Promise<NextResponse>;
}

export const clientController = (clientRepository: ClientRepository): ClientController => ({
    create: async (request: Request): Promise<NextResponse> => {
        try {
            const body = await request.json();

            if (!body.name && !body.contact) {
                return NextResponse.json(
                    { error: 'El nombre y el contacto son requeridos' },
                    { status: 400 }
                );
            }

            const client = await createClientUseCase({ name: body.name, contact: body.contact }, clientRepository);
            return NextResponse.json(client, { status: 201 });

        } catch (error) {
            if (error instanceof Error) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }

            console.error('Error creando Cliente:', error);
            return NextResponse.json(
                { error: 'Error interno del servidor' },
                { status: 500 }
            );
        }
    },

    findAll: async (): Promise<NextResponse> => {
        try {
            const clients = await findAllUseCase(clientRepository);
            return NextResponse.json(clients);
        } catch (error) {
            console.error('Error obteniendo fisioterapeutas:', error);
            return NextResponse.json(
                { error: 'Error interno del servidor' },
                { status: 500 }
            );
        }
    },

    findById: async (id: string): Promise<NextResponse> => {
        try {
            const client = await findByIdUseCase(id, clientRepository);

            if (!client) {
                return NextResponse.json(
                    { error: 'Cliente no encontrado' },
                    { status: 404 }
                );
            }

            return NextResponse.json(client);
        } catch (error) {
            if (error instanceof Error) {
                return NextResponse.json(
                    { error: error.message },
                    { status: 400 }
                );
            }

            console.error('Error obteniendo el cliente:', error);
            return NextResponse.json(
                { error: 'Error interno del servidor' },
                { status: 500 }
            );
        }
    },

     delete: async (id: string): Promise<NextResponse> => {
        try {
          const client: Client = { id, name: '', contact: '' };
          const deletedClient = await deleteClientUseCase(client, clientRepository);
    
          if (!deletedClient) {
            return NextResponse.json(
              { error: 'Cliente no encontrado' },
              { status: 404 }
            );
          }
    
          return NextResponse.json(deletedClient);
        } catch (error) {
          if (error instanceof Error) {
            return NextResponse.json(
              { error: error.message },
              { status: 400 }
            );
          }
    
          console.error('Error eliminando cliente:', error);
          return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
          );
        }
      },

       update: async (id: string, request: Request): Promise<NextResponse> => {
          try {
            const body:UpdateRequestDTO  = await request.json();
      
            if (!body.name) {
              return NextResponse.json(
                { error: 'El nombre es requerido' },
                { status: 400 }
              );
            }
      
            // const client: Client = { id, };
            const client = {id, ...fromUpdateRequestDTOtoClient(body)};
            const updatedClient = await updateClientUseCase(client, clientRepository);
      
            return NextResponse.json(updatedClient);
          } catch (error) {
            if (error instanceof Error) {
              return NextResponse.json(
                { error: error.message },
                { status: 400 }
              );
            }
      
            console.error('Error actualizando cliente:', error);
            return NextResponse.json(
              { error: 'Error interno del servidor' },
              { status: 500 }
            );
          }
        },
})
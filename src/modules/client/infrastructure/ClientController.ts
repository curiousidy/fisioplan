import { NextResponse } from "next/server";
import { ClientRepository } from "../domain/ClientRepository";
import { createClientUseCase } from "../application/create/CreateClientUseCase";

export interface ClientController {
    create(request: Request): Promise<NextResponse>;
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

            const client = await createClientUseCase({name: body.name,contact: body.contact}, clientRepository);
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
    }
})
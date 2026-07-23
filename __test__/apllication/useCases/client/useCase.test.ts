import { ClientRepository } from "@/modules/client/domain/ClientRepository";
import { updateClientUseCase } from "@/modules/client/application/update/UpdateUseCase";
import { beforeEach, describe, it, vi, expect } from "vitest";

describe('Client use cases', () => {
    const mockClientRepository: ClientRepository = {
        create: vi.fn(),
        findById: vi.fn(),
        findByNameAndContact: vi.fn(),
        findAll: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    }

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('updateClientUseCase', () => {
        it('should update an existing client', async () => {
            // Arrange (Preparar)
            const existingClient = {
                "id": "323a9983-9735-4fae-9ef0-70730c8a0eca",
                "name": "Adre",
                "contact": "787878787"
            };
            const updateData = {
                id: '323a9983-9735-4fae-9ef0-70730c8a0eca',
                name: 'Adrielito'
            };

            // Configuramos el mock: cuando llame a findById, devuelve el cliente existente
            vi.mocked(mockClientRepository.findById).mockResolvedValue(existingClient);
            // Configuramos el mock: cuando llame a update, devuelve el cliente actualizado
            vi.mocked(mockClientRepository.update).mockResolvedValue({
                ...existingClient,
                name: 'Adrielito'
            });

            // Act (Actuar)
            const result = await updateClientUseCase(updateData, mockClientRepository);

            // Assert (Afirmar)
            expect(mockClientRepository.findById).toHaveBeenCalledWith('323a9983-9735-4fae-9ef0-70730c8a0eca');
            expect(mockClientRepository.update).toHaveBeenCalledWith({
                id: '323a9983-9735-4fae-9ef0-70730c8a0eca',
                name: 'Adrielito',
                contact: '787878787'
            });
            expect(result.name).toBe('Adrielito');
        });

        it('should throw error when client does not exist', async () => {
            // Arrange
            const updateData = {
                id: '999',
                name: 'No Existe'
            };

            // findById devuelve null (cliente no existe)
            vi.mocked(mockClientRepository.findById).mockResolvedValue(null);

            // Act & Assert
            await expect(updateClientUseCase(updateData, mockClientRepository))
                .rejects.toThrow('Cliente inválido');

            expect(mockClientRepository.update).not.toHaveBeenCalled();
        });
    });
})